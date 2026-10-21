import { type Edge } from '@xyflow/react'

import { workflowExportSchema, type WorkflowExport } from '@/features/validate-graph'
import type { WorkflowNode } from '@/features/workflow-editor/model/workflow-store'

export function buildWorkflowExport(nodes: WorkflowNode[], edges: Edge[]): WorkflowExport {
  const payload = {
    nodes: nodes.map((node) => ({
      id: node.id,
      kind: node.data.kind,
      label: node.data.label,
      description: node.data.description,
      position: node.position,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  }
  return workflowExportSchema.parse(payload)
}

export function downloadWorkflowJson(exportData: WorkflowExport) {
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'workflow.json'
  anchor.click()
  URL.revokeObjectURL(url)
}
