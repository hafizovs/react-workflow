import { ReactFlowProvider } from '@xyflow/react'

import { FlowCanvas } from '@/widgets/flow-canvas'
import { NodePalette } from '@/widgets/node-palette'
import { PropertyPanel } from '@/widgets/property-panel'

export function EditorPage() {
  return (
    <ReactFlowProvider>
      <div className="flex min-h-svh flex-col">
        <header className="border-b border-slate-200 bg-white px-4 py-3">
          <h1 className="text-lg font-semibold text-slate-900">Workflow editor</h1>
          <p className="text-sm text-slate-600">
            Build trigger → condition → action flows. Validate before export.
          </p>
        </header>
        <div className="flex min-h-0 flex-1">
          <NodePalette />
          <FlowCanvas />
          <PropertyPanel />
        </div>
      </div>
    </ReactFlowProvider>
  )
}
