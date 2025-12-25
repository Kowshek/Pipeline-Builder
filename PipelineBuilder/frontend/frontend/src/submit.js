// frontend/src/submit.js

import { useStore } from "./store"; // Import the store to access node data
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  // Get the actual nodes and edges from the React Flow state
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      // Prepare the form data (backend expects 'pipeline' field)
      const formData = new FormData();
      formData.append("pipeline", JSON.stringify({ nodes, edges }));

      // Send POST request to your FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Display the result nicely
      alert(`
                Pipeline Analysis:
                ------------------
                Number of Nodes: ${data.num_nodes}
                Number of Edges: ${data.num_edges}
                Is DAG (No Loops): ${data.is_dag}
            `);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Error: Could not connect to the backend. Is it running?");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="submit"
        onClick={handleSubmit}
        style={{ 
          backgroundColor: "#6366f1",
          padding: "7px",
          borderRadius: "5px",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          border: "none",
        }}
      >
        Submit
      </button>
    </div>
  );
};
