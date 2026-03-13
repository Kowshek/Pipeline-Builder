// src/nodes/baseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  handles = [],
  children,
  width = 220,
  minHeight = 80,
  style = {},
}) => {
  return (
    <div
      style={{
        width: width,
        minHeight: minHeight,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        border: '1px solid rgba(99, 102, 241, 0.5)',
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(99, 102, 241, 0.15), 0 4px 20px rgba(0,0,0,0.4)',
        fontFamily: "'Segoe UI', sans-serif",
        color: '#e2e8f0',
        overflow: 'visible',
        transition: 'box-shadow 0.2s ease',
        ...style,
      }}
    >
      {/* Node Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '11px 11px 0 0',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
      </div>

      {/* Node Body */}
      <div
        style={{
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {children}
      </div>

      {/* Render all Handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            background: handle.type === 'source' ? '#6366f1' : '#8b5cf6',
            width: '10px',
            height: '10px',
            border: '2px solid #fff',
            boxShadow: '0 0 6px rgba(99,102,241,0.6)',
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};