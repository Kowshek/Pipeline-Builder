// store.js
import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  history: [],      // ← undo stack
  future: [],       // ← redo stack

  // Save current state to history
  saveHistory: () => {
    const { nodes, edges, history } = get();
    set({
      history: [...history, { nodes, edges }],
      future: [], // clear redo on new action
    });
  },

  // Undo
  undo: () => {
    const { history, nodes, edges, future } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: history.slice(0, -1),
      future: [{ nodes, edges }, ...future],
    });
  },

  // Redo
  redo: () => {
    const { future, nodes, edges, history } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(1),
      history: [...history, { nodes, edges }],
    });
  },

  // Clear all
  clearCanvas: () => {
    const { nodes, edges, history } = get();
    set({
      history: [...history, { nodes, edges }],
      future: [],
      nodes: [],
      edges: [],
    });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    get().saveHistory();
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    get().saveHistory();
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
          style: { stroke: '#6366f1', strokeWidth: 2 },
          label: '',
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));