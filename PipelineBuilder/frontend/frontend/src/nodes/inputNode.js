// frontend/src/nodes/inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  // Define handles for this specific node
  const handles = [{ type: "source", position: Position.Right, id: "value" }];

  return (
    <BaseNode id={id} data={{ label: "Input" }} handles={handles}>
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
          value={inputType}
          onChange={handleTypeChange}
          style={{ width: "100%" }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
