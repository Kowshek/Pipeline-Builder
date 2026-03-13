# VectorShift Pipeline Builder

## Setup & Run

### Frontend
cd frontend/frontend
npm install
npm start

### Backend
cd backend/backend
python -m pip install fastapi uvicorn pydantic
python -m uvicorn main:app --reload

## What I Built

### Part 1 - Node Abstraction
- Created `BaseNode` component in `/nodes/baseNode.js`
- All nodes extend BaseNode (title, handles, styling)
- Added 5 new nodes: Filter, Math, Transform, API, Note

### Part 2 - Styling
- VectorShift-inspired dark purple theme
- Consistent design system across all nodes
- Animated edges, glow effects, hover states

### Part 3 - Text Node Logic  
- Auto-resize width/height as user types
- Detects {{variable}} syntax → creates dynamic handles

### Part 4 - Backend Integration
- Submit sends nodes/edges to /pipelines/parse
- Backend runs DFS cycle detection for DAG check
- Returns num_nodes, num_edges, is_dag
- Custom modal displays results beautifully

## Extra Features
- Search nodes in toolbar
- Undo/Redo (Ctrl+Z / Ctrl+Y)
- Live node/edge counter
- Clear canvas
- Keyboard shortcuts
- Delete nodes (Del key)