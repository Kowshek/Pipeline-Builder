// src/nodes/apiNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-response`, style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: `${id}-error`, style: { top: '65%' } },
  ];

  return (
    <BaseNode id={id} title="🌐 API Call" handles={handles} width={250}>
      <label style={labelStyle}>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={selectStyle}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </label>
      <label style={labelStyle}>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
          style={inputStyle}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <span style={{ fontSize: '10px', color: '#34d399' }}>Response →</span>
        <span style={{ fontSize: '10px', color: '#f87171' }}>Error →</span>
      </div>
    </BaseNode>
  );
};

const labelStyle = {
  display: 'flex', flexDirection: 'column',
  gap: '4px', fontSize: '11px',
  color: '#a5b4fc', fontWeight: '600',
};
const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(99,102,241,0.4)',
  borderRadius: '6px', padding: '5px 8px',
  color: '#e2e8f0', fontSize: '12px', outline: 'none', marginTop: '2px',
};
const selectStyle = { ...inputStyle, cursor: 'pointer' };