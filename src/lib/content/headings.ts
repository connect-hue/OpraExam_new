/** One registry per rendered document prevents duplicate anchor IDs. */
export function createHeadingIds() {
  const used = new Set<string>();
  return (label: string): string => {
    const base = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return id;
  };
}
