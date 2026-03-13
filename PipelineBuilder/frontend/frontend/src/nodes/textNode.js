// src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });

  // Extract {{variable}} names from text
  useEffect(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!found.includes(match[1])) {
        found.push(match[1]);
      }
    }
    setVariables(found);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';

      // Auto-expand width based on longest line
      const lines = currText.split('\n');
      const maxLength = Math.max(...lines.map((l) => l.length), 10);
      const newWidth = Math.min(Math.max(220, maxLength * 8 + 40), 500);
      setDimensions({ width: newWidth });
    }
  }, [currText]);

  // Dynamic handles for variables
  const handles = [
    // Output handle on right
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
    // Dynamic variable handles on left
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: {
        top: `${((index + 1) / (variables.length + 1)) * 100}%`,
      },
    })),
  ];

  return (
    <BaseNode
      id={id}
      title="✎ Text"
      handles={handles}
      width={dimensions.width}
    >
      {/* Show variable labels on left */}
      {variables.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginBottom: '6px'
        }}>
          {variables.map((v, i) => (
            <span key={v} style={{
              fontSize: '10px',
              color: '#a5b4fc',
              fontWeight: '600',
              paddingLeft: '4px',
              borderLeft: '2px solid #6366f1',
            }}>
              {`{{ ${v} }}`}
            </span>
          ))}
        </div>
      )}

      <label style={labelStyle}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={textareaStyle}
          rows={1}
        />
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
};

const textareaStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(99,102,241,0.4)',
  borderRadius: '6px',
  padding: '6px 8px',
  color: '#e2e8f0',
  fontSize: '12px',
  outline: 'none',
  resize: 'none',
  overflow: 'hidden',
  fontFamily: 'inherit',
  lineHeight: '1.5',
  minHeight: '36px',
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '2px',
};