// submit.js - full replacement
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';
import { ResultModal } from './components/ResultModal';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pipeline-builder-1-op5b.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      setResult(data);
      setModalOpen(true);
    } catch (err) {
      alert('❌ Backend not running. Start it with: python -m uvicorn main:app --reload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={result}
      />

      <div style={containerStyle}>
        <div style={infoStyle}>
          <span style={statStyle}>
            <span style={statNumStyle}>{nodes.length}</span> nodes
          </span>
          <span style={dotStyle}>•</span>
          <span style={statStyle}>
            <span style={statNumStyle}>{edges.length}</span> edges
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.background =
                'linear-gradient(90deg, #4f46e5, #7c3aed)';
              e.target.style.boxShadow = '0 0 25px rgba(99,102,241,0.6)';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              'linear-gradient(90deg, #6366f1, #8b5cf6)';
            e.target.style.boxShadow = '0 0 12px rgba(99,102,241,0.3)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {loading ? '⏳ Analyzing...' : '⚡ Run Pipeline'}
        </button>
      </div>
    </>
  );
};

// styles (keep same as before)
const containerStyle = {
  position: 'fixed',
  bottom: '0',
  left: '220px',
  right: '0',
  height: '60px',
  background: 'linear-gradient(90deg, #0a0a14, #0f0f1a)',
  borderTop: '1px solid rgba(99,102,241,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  zIndex: 10,
};
const infoStyle = {
  display: 'flex', alignItems: 'center',
  gap: '8px', color: '#64748b', fontSize: '12px',
};
const statStyle = { color: '#94a3b8' };
const statNumStyle = {
  color: '#a5b4fc', fontWeight: '700', fontSize: '14px',
};
const dotStyle = { color: '#334155' };
const buttonStyle = {
  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
  color: '#fff', border: 'none',
  borderRadius: '8px', padding: '10px 28px',
  fontSize: '13px', fontWeight: '700',
  boxShadow: '0 0 12px rgba(99,102,241,0.3)',
  transition: 'all 0.2s ease',
  letterSpacing: '0.05em',
};