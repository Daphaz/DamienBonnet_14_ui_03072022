export const isChildElement = (
  parent: Element | null | undefined,
  child: Element | null | undefined
): boolean => {
  if (!parent || !child) return false;
  // eslint-disable-next-line no-undef
  let node: (Node & ParentNode) | null = child;
  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
};
