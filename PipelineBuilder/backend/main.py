from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: list, edges: list) -> bool:
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in graph:
            graph[src].append(tgt)

    state = {node['id']: 0 for node in nodes}

    def dfs(node_id):
        if state.get(node_id) == 1:
            return False
        if state.get(node_id) == 2:
            return True
        state[node_id] = 1
        for neighbor in graph.get(node_id, []):
            if not dfs(neighbor):
                return False
        state[node_id] = 2
        return True

    for node in nodes:
        if state[node['id']] == 0:
            if not dfs(node['id']):
                return False
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(nodes, edges)
    }
