// src/nodes/inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode id={id} title="✦ Input" handles={handles}>
      <label style={labelStyle}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={selectStyle}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Image">Image</option>
          <option value="Number">Number</option>
        </select>
      </label>
    </BaseNode>
  );
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '11px',
  color: '#a5b4fc',
  fontWeight: '600',
  letterSpacing: '0.03em',
};

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(99,102,241,0.4)',
  borderRadius: '6px',
  padding: '5px 8px',
  color: '#e2e8f0',
  fontSize: '12px',
  outline: 'none',
  marginTop: '2px',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};