export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Find all import declarations
  root.find(j.ImportDeclaration).forEach(path => {
    const node = path.node;

    // Only process imports from 'atoms', 'molecules', or 'organisms'
    if (['atoms', 'molecules', 'organisms', 'hooks'].includes(node.source.value) && node.specifiers.length > 0) {
      // Replace the grouped import with individual imports
      const individualImports = node.specifiers.map(specifier => {
        return j.importDeclaration(
          [j.importSpecifier(specifier.local)],
          j.literal(`${node.source.value}/${specifier.local.name}`)
        );
      });

      // Replace the original import statement with individual imports
      j(path).replaceWith(individualImports);
    }
  });

  return root.toSource({ quote: 'single' });
}
