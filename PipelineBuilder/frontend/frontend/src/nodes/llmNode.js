// src/nodes/llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33%' },
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '66%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode id={id} title="⚡ LLM" handles={handles} width={240}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{
          margin: 0,
          fontSize: '11px',
          color: '#94a3b8',
          lineHeight: '1.5',
        }}>
          Large Language Model node. Connect system prompt and user prompt to generate a response.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '10px', color: '#a5b4fc', fontWeight: '600' }}>
            ← System
          </span>
          <span style={{ fontSize: '10px', color: '#a5b4fc', fontWeight: '600' }}>
            ← Prompt
          </span>
          <span style={{ fontSize: '10px', color: '#6366f1', fontWeight: '600', textAlign: 'right' }}>
            Response →
          </span>
        </div>
      </div>
    </BaseNode>
  );
};