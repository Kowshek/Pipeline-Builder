// frontend/src/nodes/dbNode.js
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DBNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: Position.Left, id: "query" },
    { type: "source", position: Position.Right, id: "result" },
  ];
  return (
    <BaseNode id={id} data={{ label: "Database" }} handles={handles}>
      <div>Executes DB query.</div>
    </BaseNode>
  );
};
