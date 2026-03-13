// ui.js
import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { FilterNode } from "./nodes/filterNode";
import { NoteNode } from "./nodes/noteNode";
import { MathNode } from "./nodes/mathNode";
import { ApiNode } from "./nodes/apiNode";
import { TransformNode } from "./nodes/transformNode";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  note: NoteNode,
  math: MathNode,
  api: ApiNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const { undo, redo } = useStore(
    (state) => ({ undo: state.undo, redo: state.redo }),
    shallow,
  );

  useEffect(() => {
    const handleKeyboard = (e) => {
      // Ctrl+Z = Undo
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Y or Ctrl+Shift+Z = Redo
      if (
        (e.ctrlKey && e.key === "y") ||
        (e.ctrlKey && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault();
        redo();
      }
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [undo, redo]);

  // Delete selected nodes with Backspace or Delete key
  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        // Don't delete if user is typing in an input
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.tagName === "SELECT"
        )
          return;

        // Remove selected nodes
        const selectedNodes = nodes.filter((n) => n.selected);
        const selectedEdges = edges.filter((e) => e.selected);

        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          onNodesChange(
            selectedNodes.map((n) => ({ type: "remove", id: n.id })),
          );
          onEdgesChange(
            selectedEdges.map((e) => ({ type: "remove", id: e.id })),
          );
        }
      }
    },
    [nodes, edges, onNodesChange, onEdgesChange],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        addNode(newNode);
      }
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const kbdStyle = {
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "4px",
    padding: "1px 5px",
    fontSize: "9px",
    color: "#a5b4fc",
    marginRight: "6px",
    fontFamily: "monospace",
  };

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        flex: 1,
        height: "100vh",
        background: "#080812",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          style: { stroke: "#6366f1", strokeWidth: 2 },
          animated: true,
        }}
        deleteKeyCode={["Backspace", "Delete"]}
      >
        <Background
          color="rgba(99,102,241,0.15)"
          gap={gridSize}
          variant="dots"
        />
        <Controls
          style={{
            background: "#1a1a2e",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "8px",
          }}
        />
        <MiniMap
          style={{
            background: "#0f0f1a",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "8px",
          }}
          nodeColor="#6366f1"
          maskColor="rgba(0,0,0,0.6)"
        />
      </ReactFlow>
      {/* Keyboard hint */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(15,15,26,0.8)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "10px",
          color: "#475569",
          backdropFilter: "blur(8px)",
          zIndex: 5,
          lineHeight: "1.8",
          pointerEvents: "none",
        }}
      >
        <div>
          <kbd style={kbdStyle}>Del</kbd> Delete selected
        </div>
        <div>
          <kbd style={kbdStyle}>Ctrl+Z</kbd> Undo
        </div>
        <div>
          <kbd style={kbdStyle}>Scroll</kbd> Zoom
        </div>
        <div>
          <kbd style={kbdStyle}>Drag</kbd> Move canvas
        </div>
      </div>
    </div>
  );
};
