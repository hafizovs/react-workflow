import { Handle, Position, type NodeProps } from '@xyflow/react'

import { kindStyles, type NodeKind } from '@/entities/workflow-node'
import { cn } from '@/shared/lib/cn'

type WorkflowNodeData = {
  kind: NodeKind
  label: string
  description: string
}

export function WorkflowNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as WorkflowNodeData

  return (
    <div
      className={cn(
        'min-w-[140px] rounded-lg border-2 px-3 py-2 shadow-sm',
        kindStyles[nodeData.kind],
        selected && 'ring-2 ring-blue-400',
      )}
    >
      {nodeData.kind !== 'trigger' && (
        <Handle type="target" position={Position.Left} className="!bg-slate-600" />
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{nodeData.kind}</p>
      <p className="text-sm font-medium text-slate-900">{nodeData.label}</p>
      {nodeData.kind !== 'action' && (
        <Handle type="source" position={Position.Right} className="!bg-slate-600" />
      )}
    </div>
  )
}
