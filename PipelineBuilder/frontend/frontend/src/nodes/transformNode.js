// frontend/src/nodes/transformNode.js
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: Position.Left, id: "raw" },
    { type: "source", position: Position.Right, id: "transformed" },
  ];
  return (
    <BaseNode id={id} data={{ label: "Transform" }} handles={handles}>
      <div>Transforms data format.</div>
    </BaseNode>
  );
};
