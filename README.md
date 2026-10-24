## Live demo

https://hafizovs.github.io/react-workflow/

# Workflow editor

## About

Node-based workflow builder with validation and JSON export, using React Flow, Zustand, and Zod. The canvas opens with one trigger; condition and action nodes are added from the palette and connected with edges. **Validate** accepts exactly one trigger and an acyclic graph, and **Export JSON** downloads `workflow.json`.

## Capabilities

- Seeded trigger plus condition and action nodes from the palette
- Edges between nodes
- Property panel for label and description
- **Validate**: exactly one trigger and an acyclic graph
- **Export JSON** downloads `workflow.json`

## Functionality

- Add condition and action nodes to the seeded trigger and connect them
- Edit label and description in the property panel
- **Validate**, then **Export JSON**

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
