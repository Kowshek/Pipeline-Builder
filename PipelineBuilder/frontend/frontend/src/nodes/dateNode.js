// frontend/src/nodes/dateNode.js
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DateNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: "date-out" },
  ];
  return (
    <BaseNode id={id} data={{ label: "Date Provider" }} handles={handles}>
      <div>Outputs current date.</div>
    </BaseNode>
  );
};
