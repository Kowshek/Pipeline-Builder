// src/nodes/filterNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } },
  ];

  return (
    <BaseNode id={id} title="⚙ Filter" handles={handles} width={230}>
      <label style={labelStyle}>
        Condition:
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
          style={inputStyle}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <span style={{ fontSize: '10px', color: '#34d399' }}>True →</span>
        <span style={{ fontSize: '10px', color: '#f87171' }}>False →</span>
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