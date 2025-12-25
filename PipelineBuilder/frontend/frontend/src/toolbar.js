// frontend/src/toolbar.js

import React from "react";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="date" label="Date" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="note" label="Note" />
        <DraggableNode type="db" label="DB" />
      </div>
    </div>
  );
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5e1",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        color: "#475569",
        fontWeight: "500",
        fontSize: "13px",
        padding: "0 12px",
        transition: "all 0.2s",
      }}
      draggable
    >
      <span style={{ color: "#6366f1", marginRight: "6px" }}>•</span>
      {label}
    </div>
  );
};
