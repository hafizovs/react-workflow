import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react'
import { create } from 'zustand'

import { defaultNodeData, type NodeKind } from '@/entities/workflow-node'

export type WorkflowNode = Node<{ kind: NodeKind; label: string; description: string }>

type WorkflowState = {
  nodes: WorkflowNode[]
  edges: Edge[]
  selectedNodeId: string | null
  validationMessages: string[]
  setSelectedNodeId: (id: string | null) => void
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  addNode: (kind: NodeKind) => void
  updateSelectedNode: (patch: { label?: string; description?: string }) => void
  setValidationMessages: (messages: string[]) => void
}

let nodeCounter = 1

const seedTrigger: WorkflowNode = {
  id: 'trigger-1',
  type: 'workflow',
  position: { x: 80, y: 120 },
  data: { kind: 'trigger', ...defaultNodeData('trigger') },
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [seedTrigger],
  edges: [],
  selectedNodeId: null,
  validationMessages: [],
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) =>
    set({ edges: addEdge({ ...connection, id: `e-${crypto.randomUUID()}` }, get().edges) }),
  addNode: (kind) => {
    nodeCounter += 1
    const id = `${kind}-${nodeCounter}`
    const node: WorkflowNode = {
      id,
      type: 'workflow',
      position: { x: 120 + nodeCounter * 40, y: 80 + nodeCounter * 30 },
      data: { kind, ...defaultNodeData(kind) },
    }
    set({ nodes: [...get().nodes, node], selectedNodeId: id })
  },
  updateSelectedNode: (patch) => {
    const { selectedNodeId, nodes } = get()
    if (!selectedNodeId) return
    set({
      nodes: nodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label: patch.label ?? node.data.label,
                description: patch.description ?? node.data.description,
              },
            }
          : node,
      ),
    })
  },
  setValidationMessages: (messages) => set({ validationMessages: messages }),
}))
