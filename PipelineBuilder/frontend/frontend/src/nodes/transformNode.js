// src/nodes/transformNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const transforms = [
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'trim', label: 'Trim Whitespace' },
    { value: 'reverse', label: 'Reverse' },
    { value: 'json_parse', label: 'JSON Parse' },
    { value: 'json_stringify', label: 'JSON Stringify' },
  ];

  return (
    <BaseNode id={id} title="⇄ Transform" handles={handles} width={230}>
      <label style={labelStyle}>
        Operation:
        <select
          value={transform}
          onChange={(e) => setTransform(e.target.value)}
          style={selectStyle}
        >
          {transforms.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>
      <p style={{
        margin: 0, fontSize: '10px',
        color: '#64748b', fontStyle: 'italic'
      }}>
        Transforms input text using selected operation
      </p>
    </BaseNode>
  );
};

const labelStyle = {
  display: 'flex', flexDirection: 'column',
  gap: '4px', fontSize: '11px',
  color: '#a5b4fc', fontWeight: '600',
};
const selectStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(99,102,241,0.4)',
  borderRadius: '6px', padding: '5px 8px',
  color: '#e2e8f0', fontSize: '12px',
  outline: 'none', cursor: 'pointer', marginTop: '2px',
};