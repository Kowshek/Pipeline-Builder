// frontend/src/nodes/BaseNode.js

import { Handle, Position, useReactFlow } from 'reactflow'; // Import useReactFlow

export const BaseNode = ({ id, data, children, handles = [] }) => {
  const { deleteElements } = useReactFlow(); // Access the delete action

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div 
      style={{ 
        width: 220, 
        height: 'auto', 
        border: '1px solid #e2e8f0', 
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', 
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6366f1'; 
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
      }}
    >
      {/* Header Section */}
      <div style={{ 
        padding: '8px 12px', 
        borderBottom: '1px solid #f1f5f9',
        backgroundColor: '#f8fafc',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        fontWeight: '600',
        color: '#475569',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Push X to the right
        gap: '8px'
      }}>
        {/* Left side: Icon + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
          {data.label || 'Node'}
        </div>

        {/* Right side: Delete Button (X) */}
        <button 
          onClick={handleDelete}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            fontSize: '16px',
            padding: '0 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ef4444'} // Red on hover
          onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
        >
          ×
        </button>
      </div>

      {/* Content Section */}
      <div style={{ padding: '12px', fontSize: '13px', color: '#334155' }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            ...handle.style,
            width: '10px',
            height: '10px',
            backgroundColor: '#6366f1', 
            border: '2px solid #ffffff', 
          }}
        />
      ))}
    </div>
  );
};