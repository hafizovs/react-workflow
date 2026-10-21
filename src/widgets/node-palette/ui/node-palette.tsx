import type { NodeKind } from '@/entities/workflow-node'
import { useWorkflowStore } from '@/features/workflow-editor/model/workflow-store'
import { cn } from '@/shared/lib/cn'

const items: { kind: NodeKind; hint: string }[] = [
  { kind: 'trigger', hint: 'Start of flow' },
  { kind: 'condition', hint: 'Branch logic' },
  { kind: 'action', hint: 'Side effect' },
]

export function NodePalette() {
  const addNode = useWorkflowStore((s) => s.addNode)

  return (
    <aside className="flex w-52 flex-col gap-2 border-r border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-800">Palette</h2>
      {items.map(({ kind, hint }) => (
        <button
          key={kind}
          type="button"
          onClick={() => addNode(kind)}
          className={cn(
            'rounded-md border border-slate-200 px-3 py-2 text-left text-sm',
            'hover:border-blue-400 hover:bg-blue-50',
          )}
        >
          <span className="font-medium capitalize">{kind}</span>
          <span className="block text-xs text-slate-500">{hint}</span>
        </button>
      ))}
    </aside>
  )
}
