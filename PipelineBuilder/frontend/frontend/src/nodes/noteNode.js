// frontend/src/nodes/noteNode.js
import { BaseNode } from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  // Note node typically has no handles, just for display
  return (
    <BaseNode id={id} data={{ label: "Sticky Note" }} handles={[]}>
      <textarea placeholder="Type note here..." style={{ width: "100%" }} />
    </BaseNode>
  );
};
