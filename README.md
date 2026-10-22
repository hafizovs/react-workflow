## Live demo

https://hafizovs.github.io/react-workflow/

# Workflow editor

Node-based workflow builder with validation and JSON export — React Flow, Zustand, Zod.

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:5005
pnpm check
pnpm build
```

## Manual demo

1. Open the editor — one trigger node is seeded.
2. Add condition and action nodes from the palette.
3. Connect nodes with edges.
4. Edit label/description in the property panel.
5. **Validate** — errors if not exactly one trigger or if the graph has a cycle.
6. **Export JSON** to download `workflow.json`.
