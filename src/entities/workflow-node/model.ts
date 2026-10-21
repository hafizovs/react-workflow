import { z } from 'zod'

export const nodeKindSchema = z.enum(['trigger', 'condition', 'action'])
export type NodeKind = z.infer<typeof nodeKindSchema>

export const nodeDataSchema = z.object({
  label: z.string().min(1),
  description: z.string(),
})

export type WorkflowNodeData = z.infer<typeof nodeDataSchema>

export const defaultNodeData = (kind: NodeKind): WorkflowNodeData => ({
  label: kind.charAt(0).toUpperCase() + kind.slice(1),
  description: '',
})

export const kindStyles: Record<NodeKind, string> = {
  trigger: 'border-emerald-500 bg-emerald-50',
  condition: 'border-amber-500 bg-amber-50',
  action: 'border-blue-500 bg-blue-50',
}
