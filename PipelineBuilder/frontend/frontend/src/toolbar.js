// toolbar.js
import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const PipelineToolbar = () => {
  const [search, setSearch] = useState('');

  const { nodes, edges, clearCanvas, undo, redo, history, future } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      clearCanvas: state.clearCanvas,
      undo: state.undo,
      redo: state.redo,
      history: state.history,
      future: state.future,
    }),
    shallow
  );

  const allNodes = [
    { type: 'customInput', label: 'Input', icon: '✦' },
    { type: 'customOutput', label: 'Output', icon: '⊞' },
    { type: 'llm', label: 'LLM', icon: '⚡' },
    { type: 'text', label: 'Text', icon: '✎' },
    { type: 'filter', label: 'Filter', icon: '⚙' },
    { type: 'math', label: 'Math', icon: '∑' },
    { type: 'transform', label: 'Transform', icon: '⇄' },
    { type: 'api', label: 'API Call', icon: '🌐' },
    { type: 'note', label: 'Note', icon: '📝' },
  ];

  const filtered = allNodes.filter((n) =>
    n.label.toLowerCase().includes(search.toLowerCase())
  );

  const coreNodes = filtered.filter((n) =>
    ['customInput', 'customOutput', 'llm', 'text'].includes(n.type)
  );
  const logicNodes = filtered.filter((n) =>
    ['filter', 'math', 'transform'].includes(n.type)
  );
  const utilityNodes = filtered.filter((n) =>
    ['api', 'note'].includes(n.type)
  );

  return (
    <div style={toolbarStyle}>

      {/* ── Header ── */}
      <div style={headerStyle}>
        <div style={logoStyle}>VS</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            VectorShift
          </div>
          <div style={{ fontSize: '10px', color: '#a5b4fc' }}>
            Pipeline Builder
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div style={{ padding: '0 16px 12px 16px' }}>
        <input
          type="text"
          placeholder="🔍  Search nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '8px',
            padding: '8px 10px',
            color: '#e2e8f0',
            fontSize: '11px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={dividerStyle} />

      {/* ── Core Nodes ── */}
      {coreNodes.length > 0 && (
        <div style={sectionStyle}>
          <span style={sectionLabelStyle}>CORE NODES</span>
          <div style={nodesGridStyle}>
            {coreNodes.map((n) => (
              <DraggableNode
                key={n.type}
                type={n.type}
                label={n.label}
                icon={n.icon}
              />
            ))}
          </div>
        </div>
      )}

      {coreNodes.length > 0 && logicNodes.length > 0 && (
        <div style={dividerStyle} />
      )}

      {/* ── Logic Nodes ── */}
      {logicNodes.length > 0 && (
        <div style={sectionStyle}>
          <span style={sectionLabelStyle}>LOGIC NODES</span>
          <div style={nodesGridStyle}>
            {logicNodes.map((n) => (
              <DraggableNode
                key={n.type}
                type={n.type}
                label={n.label}
                icon={n.icon}
              />
            ))}
          </div>
        </div>
      )}

      {logicNodes.length > 0 && utilityNodes.length > 0 && (
        <div style={dividerStyle} />
      )}

      {/* ── Utility Nodes ── */}
      {utilityNodes.length > 0 && (
        <div style={sectionStyle}>
          <span style={sectionLabelStyle}>UTILITY NODES</span>
          <div style={nodesGridStyle}>
            {utilityNodes.map((n) => (
              <DraggableNode
                key={n.type}
                type={n.type}
                label={n.label}
                icon={n.icon}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── No Results ── */}
      {filtered.length === 0 && (
        <div style={{
          padding: '20px 16px',
          textAlign: 'center',
          color: '#475569',
          fontSize: '12px',
        }}>
          No nodes found for "{search}"
        </div>
      )}

      {/* ══════════════════════════════
          ── BOTTOM SECTION ──
      ══════════════════════════════ */}
      <div style={{ marginTop: 'auto' }}>

        <div style={dividerStyle} />

        {/* ── Live Stats ── */}
        <div style={{
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#a5b4fc',
              lineHeight: 1,
            }}>
              {nodes.length}
            </div>
            <div style={{
              fontSize: '9px',
              color: '#475569',
              fontWeight: '600',
              marginTop: '4px',
              letterSpacing: '0.08em',
            }}>
              NODES
            </div>
          </div>

          <div style={{
            width: '1px',
            height: '30px',
            background: 'rgba(99,102,241,0.2)',
          }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#a5b4fc',
              lineHeight: 1,
            }}>
              {edges.length}
            </div>
            <div style={{
              fontSize: '9px',
              color: '#475569',
              fontWeight: '600',
              marginTop: '4px',
              letterSpacing: '0.08em',
            }}>
              EDGES
            </div>
          </div>
        </div>

        <div style={dividerStyle} />

        {/* ── Undo / Redo ── */}
        <div style={{
          padding: '12px 16px 8px 16px',
          display: 'flex',
          gap: '8px',
        }}>
          <button
            onClick={undo}
            disabled={!history || history.length === 0}
            title="Undo (Ctrl+Z)"
            style={{
              flex: 1,
              padding: '8px',
              background: history && history.length > 0
                ? 'rgba(99,102,241,0.1)'
                : 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '7px',
              color: history && history.length > 0 ? '#a5b4fc' : '#334155',
              fontSize: '11px',
              cursor: history && history.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (history && history.length > 0) {
                e.target.style.background = 'rgba(99,102,241,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (history && history.length > 0) {
                e.target.style.background = 'rgba(99,102,241,0.1)';
              }
            }}
          >
            ↩ Undo
          </button>

          <button
            onClick={redo}
            disabled={!future || future.length === 0}
            title="Redo (Ctrl+Y)"
            style={{
              flex: 1,
              padding: '8px',
              background: future && future.length > 0
                ? 'rgba(99,102,241,0.1)'
                : 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '7px',
              color: future && future.length > 0 ? '#a5b4fc' : '#334155',
              fontSize: '11px',
              cursor: future && future.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (future && future.length > 0) {
                e.target.style.background = 'rgba(99,102,241,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (future && future.length > 0) {
                e.target.style.background = 'rgba(99,102,241,0.1)';
              }
            }}
          >
            ↪ Redo
          </button>
        </div>

        {/* ── Clear Canvas ── */}
        <div style={{ padding: '0 16px 20px 16px' }}>
          <button
            onClick={() => {
              if (nodes.length === 0) return;
              if (window.confirm('Clear all nodes and edges?')) {
                clearCanvas();
              }
            }}
            disabled={nodes.length === 0}
            style={{
              width: '100%',
              padding: '9px',
              background: nodes.length === 0
                ? 'rgba(255,255,255,0.02)'
                : 'rgba(248,113,113,0.08)',
              border: `1px solid ${
                nodes.length === 0
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(248,113,113,0.25)'
              }`,
              borderRadius: '8px',
              color: nodes.length === 0 ? '#334155' : '#f87171',
              fontSize: '11px',
              fontWeight: '600',
              cursor: nodes.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => {
              if (nodes.length > 0) {
                e.target.style.background = 'rgba(248,113,113,0.15)';
                e.target.style.borderColor = 'rgba(248,113,113,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (nodes.length > 0) {
                e.target.style.background = 'rgba(248,113,113,0.08)';
                e.target.style.borderColor = 'rgba(248,113,113,0.25)';
              }
            }}
          >
            🗑️ Clear Canvas
          </button>
        </div>

      </div>
    </div>
  );
};

// ── Styles ──────────────────────────────────────

const toolbarStyle = {
  width: '220px',
  height: '100vh',
  background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a14 100%)',
  borderRight: '1px solid rgba(99,102,241,0.2)',
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  overflowY: 'auto',
  flexShrink: 0,
  boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '20px 16px',
  background: 'rgba(99,102,241,0.08)',
  marginBottom: '12px',
};

const logoStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '800',
  color: '#fff',
  flexShrink: 0,
  boxShadow: '0 0 10px rgba(99,102,241,0.4)',
};

const dividerStyle = {
  height: '1px',
  background: 'rgba(99,102,241,0.15)',
  margin: '0 16px',
};

const sectionStyle = {
  padding: '14px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const sectionLabelStyle = {
  fontSize: '9px',
  fontWeight: '700',
  color: '#475569',
  letterSpacing: '0.1em',
};

const nodesGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
};