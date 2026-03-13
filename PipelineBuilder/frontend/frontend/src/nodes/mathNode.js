// src/nodes/mathNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '35%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '65%' } },
    { type: 'source', position: Position.Right, id: `${id}-result` },
  ];

  const ops = [
    { value: 'add', label: 'Add (+)' },
    { value: 'subtract', label: 'Subtract (-)' },
    { value: 'multiply', label: 'Multiply (×)' },
    { value: 'divide', label: 'Divide (÷)' },
  ];

  return (
    <BaseNode id={id} title="∑ Math" handles={handles} width={220}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '10px', color: '#a5b4fc' }}>A</span>
        <span style={{ fontSize: '10px', color: '#a5b4fc' }}>B</span>
      </div>
      <label style={labelStyle}>
        Operation:
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={selectStyle}
        >
          {ops.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </label>
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