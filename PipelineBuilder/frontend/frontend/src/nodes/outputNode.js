// frontend/src/nodes/outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const handles = [{ type: "target", position: Position.Left, id: "value" }];

  return (
    <BaseNode id={id} data={{ label: "Output" }} handles={handles}>
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ width: "100%", marginBottom: "5px" }}
        />
      </label>
      <label>
        Type:
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{ width: "100%" }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
