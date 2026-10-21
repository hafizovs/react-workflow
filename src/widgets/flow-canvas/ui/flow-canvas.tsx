import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type NodeTypes,
} from '@xyflow/react'
import { useCallback, useMemo } from 'react'

import { buildWorkflowExport, downloadWorkflowJson } from '@/features/export-workflow'
import { validateWorkflow } from '@/features/validate-graph'
import { WorkflowNodeComponent } from '@/features/workflow-editor/ui/workflow-node'
import { useWorkflowStore } from '@/features/workflow-editor/model/workflow-store'

const nodeTypes: NodeTypes = {
  workflow: WorkflowNodeComponent,
}

export function FlowCanvas() {
  const nodes = useWorkflowStore((s) => s.nodes)
  const edges = useWorkflowStore((s) => s.edges)
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange)
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange)
  const onConnect = useWorkflowStore((s) => s.onConnect)
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId)
  const setValidationMessages = useWorkflowStore((s) => s.setValidationMessages)
  const validationMessages = useWorkflowStore((s) => s.validationMessages)

  const defaultEdgeOptions = useMemo(() => ({ animated: true }), [])

  const onValidate = useCallback(() => {
    const issues = validateWorkflow({
      nodes: nodes.map((n) => ({ id: n.id, kind: n.data.kind })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    })
    setValidationMessages(issues.map((i) => i.message))
  }, [edges, nodes, setValidationMessages])

  const onExport = useCallback(() => {
    const issues = validateWorkflow({
      nodes: nodes.map((n) => ({ id: n.id, kind: n.data.kind })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    })
    if (issues.length > 0) {
      setValidationMessages(issues.map((i) => i.message))
      return
    }
    downloadWorkflowJson(buildWorkflowExport(nodes, edges))
    setValidationMessages(['Exported workflow.json'])
  }, [edges, nodes, setValidationMessages])

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2">
        <button
          type="button"
          onClick={onValidate}
          className="rounded bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
        >
          Validate
        </button>
        <button
          type="button"
          onClick={onExport}
          className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Export JSON
        </button>
      </div>
      {validationMessages.length > 0 && (
        <ul className="border-b border-slate-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
          {validationMessages.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
        >
          <MiniMap />
          <Controls />
          <Background gap={16} />
        </ReactFlow>
      </div>
    </div>
  )
}
