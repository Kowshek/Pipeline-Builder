// src/components/ResultModal.js
import { useEffect } from 'react';

export const ResultModal = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen || !data) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: '16px',
          padding: '32px',
          width: '380px',
          boxShadow: '0 0 40px rgba(99,102,241,0.3), 0 20px 60px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '20px',
            boxShadow: '0 0 15px rgba(99,102,241,0.4)',
          }}>
            ⚡
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
              Pipeline Analysis
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Results from backend
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <StatCard
            label="Total Nodes"
            value={data.num_nodes}
            color="#6366f1"
          />
          <StatCard
            label="Total Edges"
            value={data.num_edges}
            color="#8b5cf6"
          />
        </div>

        {/* DAG Status */}
        <div style={{
          padding: '14px 16px',
          borderRadius: '10px',
          background: data.is_dag
            ? 'rgba(52,211,153,0.1)'
            : 'rgba(248,113,113,0.1)',
          border: `1px solid ${data.is_dag
            ? 'rgba(52,211,153,0.3)'
            : 'rgba(248,113,113,0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <span style={{ fontSize: '24px' }}>
            {data.is_dag ? '✅' : '❌'}
          </span>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '700',
              color: data.is_dag ? '#34d399' : '#f87171',
            }}>
              {data.is_dag ? 'Valid DAG Pipeline' : 'Contains Cycles'}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              {data.is_dag
                ? 'Pipeline can be executed safely'
                : 'Circular dependencies detected'}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            boxShadow: '0 0 15px rgba(99,102,241,0.3)',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    padding: '14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(99,102,241,0.2)',
    textAlign: 'center',
  }}>
    <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
    <div style={{
      fontSize: '28px',
      fontWeight: '800',
      color: color,
      lineHeight: 1,
      marginBottom: '4px',
    }}>
      {value}
    </div>
    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>
      {label}
    </div>
  </div>
);