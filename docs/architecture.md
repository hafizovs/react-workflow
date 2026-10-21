# 05-workflow architecture

Visual workflow editor. Canvas state via Zustand + @xyflow/react; validation via pure helpers + Zod export schema.

```mermaid
flowchart LR
  palette[Node palette]
  canvas[React Flow canvas]
  panel[Property panel]
  store[Zustand store]
  validate[validate-graph]
  palette --> store --> canvas
  canvas --> panel
  canvas --> validate
```

Standalone on port **5005**; Module Federation remote `workflow/App`.
