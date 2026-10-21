export type GraphEdge = { source: string; target: string }

export function hasCycle(edges: GraphEdge[]): boolean {
  const adj = new Map<string, string[]>()
  const nodes = new Set<string>()

  for (const edge of edges) {
    nodes.add(edge.source)
    nodes.add(edge.target)
    const list = adj.get(edge.source) ?? []
    list.push(edge.target)
    adj.set(edge.source, list)
  }

  const visited = new Set<string>()
  const stack = new Set<string>()

  const dfs = (node: string): boolean => {
    visited.add(node)
    stack.add(node)
    for (const next of adj.get(node) ?? []) {
      if (!visited.has(next)) {
        if (dfs(next)) return true
      } else if (stack.has(next)) {
        return true
      }
    }
    stack.delete(node)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node) && dfs(node)) return true
  }
  return false
}
