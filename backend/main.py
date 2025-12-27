from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS so the frontend (port 3000) can talk to the backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # 1. Parse the incoming JSON string
    data = json.loads(pipeline)
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # 2. Build the Adjacency List (Graph representation)
    # Map every node ID to a list of nodes it points to
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj_list:
            adj_list[source].append(target)
            
    # 3. Check for Cycles (Is it a DAG?)
    # We use Depth First Search (DFS) to look for loops
    def has_cycle(graph):
        visited = set()
        recursion_stack = set()
        
        def dfs(node):
            # If node is in the current recursion stack, we found a loop!
            if node in recursion_stack:
                return True
            # If already fully processed, no need to check again
            if node in visited:
                return False
            
            # Add to current path
            visited.add(node)
            recursion_stack.add(node)
            
            # Visit neighbors
            for neighbor in graph.get(node, []):
                if dfs(neighbor):
                    return True
            
            # Remove from current path (backtracking)
            recursion_stack.remove(node)
            return False

        # Run DFS from every node (in case the graph is disconnected)
        for node in graph:
            if dfs(node):
                return True # Cycle found
        return False # No cycles found

    is_dag = not has_cycle(adj_list)

    # 4. Return the results
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }