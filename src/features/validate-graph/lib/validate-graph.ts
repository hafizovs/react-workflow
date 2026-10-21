import { z } from 'zod'

import { nodeKindSchema } from '@/entities/workflow-node'

import { hasCycle, type GraphEdge } from './detect-cycle'

export const workflowExportSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      kind: nodeKindSchema,
      label: z.string(),
      description: z.string(),
      position: z.object({ x: z.number(), y: z.number() }),
    }),
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
    }),
  ),
})

export type WorkflowExport = z.infer<typeof workflowExportSchema>

export type ValidationIssue = { code: 'trigger_count' | 'cycle'; message: string }

export function validateWorkflow(input: {
  nodes: { id: string; kind: string }[]
  edges: GraphEdge[]
}): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const triggers = input.nodes.filter((n) => n.kind === 'trigger')

  if (triggers.length !== 1) {
    issues.push({
      code: 'trigger_count',
      message: `Workflow must have exactly one trigger (found ${triggers.length}).`,
    })
  }

  if (hasCycle(input.edges)) {
    issues.push({
      code: 'cycle',
      message: 'Workflow graph must not contain cycles.',
    })
  }

  return issues
}
