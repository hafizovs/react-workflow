# 05-workflow — agent instructions

Visual workflow editor (Vite + FSD). Parent canon: `../AGENTS.md`.

## Commands

- Install: `pnpm install`
- Dev: `pnpm dev` (port **5005**)
- Check: `pnpm check` (= typecheck + test)
- Build: `pnpm build`

Use `pnpm` only.

## FSD map

- `src/app` — root composition
- `src/pages/editor` — editor screen
- `src/widgets/flow-canvas`, `node-palette`, `property-panel`
- `src/features/validate-graph`, `export-workflow`, `workflow-editor`
- `src/entities/workflow-node`
- `src/shared/lib`, `src/shared/config`

## Boundaries

- Graph validation (one trigger, no cycles) lives in `features/validate-graph`.
- Canvas state — Zustand in `features/workflow-editor`.
- @xyflow/react docs — MCP Context7 when unsure.

## Done when

`pnpm check` is green; manual flow: add nodes, connect edges, edit properties, validate, export JSON.
