export type Node = {
    parent: Node,
    value: {
        tag: string,
        attributes: Map<string, string>
    },
    children: Node[]
}

export type XML = {
    pick(path: string): any,
    node: Node,
}
