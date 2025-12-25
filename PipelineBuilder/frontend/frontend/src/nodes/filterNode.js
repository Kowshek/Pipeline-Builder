// frontend/src/nodes/filterNode.js
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: Position.Left, id: "input" },
    { type: "source", position: Position.Right, id: "filtered" },
  ];
  return (
    <BaseNode id={id} data={{ label: "Filter" }} handles={handles}>
      <div>Filters input data.</div>
    </BaseNode>
  );
};
