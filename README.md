# 05 — Workflow editor

**Live:** https://hafizovs.github.io/react-workflow/

Node-based workflow builder with validation and JSON export for a React CV portfolio.

**CV line:** visual workflow editor with React Flow, Zustand, and graph validation (Zod)

## Stack

Vite, React 19, TypeScript, Tailwind CSS, @xyflow/react, Zustand, Zod, Vitest. Architecture: Feature-Sliced Design.


## How to run

```bash
# from portfolio_react/
pnpm install
pnpm dev
```

Open **http://localhost:5005**

See also [docs/RUNBOOK.md](../docs/RUNBOOK.md).

## Scripts

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

## Manual demo

1. Open the editor — one trigger node is seeded.
2. Add condition and action nodes from the palette.
3. Connect nodes with edges (drag from handles).
4. Select a node and edit label/description in the property panel.
5. Click **Validate** — errors if not exactly one trigger or if the graph has a cycle.
6. Fix the graph and **Export JSON** to download `workflow.json`.
7. Use the minimap and canvas controls to navigate.

## Interview talking points

- Directed graph cycle detection before export
- Separating canvas state (Zustand) from pure validation helpers
- Custom React Flow node types and FSD slice boundaries
