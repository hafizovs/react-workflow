import { useWorkflowStore } from '@/features/workflow-editor/model/workflow-store'

export function PropertyPanel() {
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId)
  const nodes = useWorkflowStore((s) => s.nodes)
  const updateSelectedNode = useWorkflowStore((s) => s.updateSelectedNode)

  const node = nodes.find((n) => n.id === selectedNodeId)

  if (!node) {
    return (
      <aside className="w-64 border-l border-slate-200 bg-white p-4 text-sm text-slate-500">
        Select a node to edit properties.
      </aside>
    )
  }

  return (
    <aside className="flex w-64 flex-col gap-3 border-l border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-800">Properties</h2>
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        Label
        <input
          className="rounded border border-slate-300 px-2 py-1 text-sm"
          value={node.data.label}
          onChange={(e) => updateSelectedNode({ label: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-600">
        Description
        <textarea
          className="min-h-20 rounded border border-slate-300 px-2 py-1 text-sm"
          value={node.data.description}
          onChange={(e) => updateSelectedNode({ description: e.target.value })}
        />
      </label>
      <p className="text-xs text-slate-500">Kind: {node.data.kind}</p>
    </aside>
  )
}
