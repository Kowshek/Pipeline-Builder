// frontend/src/nodes/textNode.js

import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // 1. HELPER: Auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to shrink if text is deleted
      textareaRef.current.style.height = "auto";
      // Set height to scrollHeight to fit content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // 2. LOGIC: Extract variables like {{name}} and create handles
  useEffect(() => {
    // Regex to find text inside {{ }}
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      // match[1] contains the text inside brackets (the variable name)
      // We trim whitespace so "{{ var }}" becomes "var"
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }

    // Create a new handle for every unique variable found
    const newHandles = matches.map((variable, index) => ({
      id: variable,
      type: "target",
      position: Position.Left,
      // Spacing logic: distribute handles evenly
      style: { top: `${(index + 1) * (100 / (matches.length + 1))}%` },
    }));

    // Add the default output handle on the right
    newHandles.push({
      id: "output",
      type: "source",
      position: Position.Right,
    });

    setHandles(newHandles);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={{ label: "Text" }}
      handles={handles} // Pass our dynamic handles to the BaseNode
    >
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          color: "#64748b",
          fontSize: "12px",
        }}
      >
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: "100%",
            minHeight: "30px",
            boxSizing: "border-box",
            resize: "none", // Disable manual resize, we handle it automatically
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            padding: "4px",
            fontFamily: "inherit",
            fontSize: "13px",
            overflow: "hidden",
          }}
        />
      </label>

      {/* Visual helper to show extracted variables (optional, good for debugging) */}
      <div style={{ marginTop: "5px", fontSize: "10px", color: "#94a3b8" }}>
        {handles.length > 1 && (
          <span>
            Variables:{" "}
            {handles
              .filter((h) => h.id !== "output")
              .map((h) => h.id)
              .join(", ")}
          </span>
        )}
      </div>
    </BaseNode>
  );
};
