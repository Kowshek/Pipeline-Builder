// src/nodes/noteNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode id={id} title="📝 Note" handles={[]} width={200}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{
          background: 'rgba(251,191,36,0.08)',
          border: '1px solid rgba(251,191,36,0.3)',
          borderRadius: '6px',
          padding: '8px',
          color: '#fde68a',
          fontSize: '12px',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
          lineHeight: '1.5',
          width: '100%',
          minHeight: '80px',
          boxSizing: 'border-box',
        }}
      />
    </BaseNode>
  );
};