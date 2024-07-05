import { Project, SourceFile, ts } from "ts-morph";
import * as path from "path";

function removeUnusedImports(directory: string) {
  try {
    const project = new Project({
      tsConfigFilePath: "tsconfig.json",
    });

    const files = project.addSourceFilesAtPaths(
      path.join(directory, "**/*.{ts,tsx}")
    );

    files.forEach((file) => {
      const filePath = file.getFilePath();
      console.log(`Processing file: ${filePath}`);

      const importDeclarations = file.getImportDeclarations();
      const unusedImports = new Set<string>();

      importDeclarations.forEach((importDecl) => {
        const moduleSpecifier = importDecl
          .getModuleSpecifier()
          .getLiteralText();

        if (moduleSpecifier.endsWith(".css")) {
          return;
        }

        const namedImports = importDecl.getNamedImports();
        const defaultImport = importDecl.getDefaultImport();
        const namespaceImport = importDecl.getNamespaceImport();

        namedImports.forEach((namedImport) => {
          const identifier = namedImport.getName();
          if (!isIdentifierOrTypeUsed(identifier, file)) {
            unusedImports.add(namedImport.getText());
            namedImport.remove();
          }
        });

        if (defaultImport) {
          const identifier = defaultImport.getText();
          if (!isIdentifierOrTypeUsed(identifier, file)) {
            unusedImports.add(defaultImport.getText());
            importDecl.removeDefaultImport();
          }
        }

        if (namespaceImport) {
          const identifier = namespaceImport.getText();
          if (!isNamespaceIdentifierUsed(identifier, file)) {
            unusedImports.add(namespaceImport.getText());
            importDecl.removeNamespaceImport();
          }
        }

        if (
          importDecl.getNamedImports().length === 0 &&
          !importDecl.getDefaultImport() &&
          !importDecl.getNamespaceImport()
        ) {
          importDecl.remove();
        }
      });

      file.saveSync();
      console.log(
        `Unused imports removed from ${filePath}: ${Array.from(
          unusedImports
        ).join(", ")}`
      );
    });

    console.log("Unused imports removed successfully.");
  } catch (error) {
    console.error(`Error removing unused imports: ${error}`);
  }
}

function isIdentifierOrTypeUsed(identifier: string, file: SourceFile): boolean {
  const identifierUsages = file
    .getDescendantsOfKind(ts.SyntaxKind.Identifier)
    .filter((node) => node.getText() === identifier);

  const typeUsages = file
    .getDescendantsOfKind(ts.SyntaxKind.TypeReference)
    .filter((node) => node.getTypeName().getText() === identifier);

  const typeAliasUsages = file
    .getDescendantsOfKind(ts.SyntaxKind.TypeAliasDeclaration)
    .filter((node) => node.getName() === identifier);

  return (
    identifierUsages.length > 1 ||
    typeUsages.length > 0 ||
    typeAliasUsages.length > 0
  );
}

function isNamespaceIdentifierUsed(
  identifier: string,
  file: SourceFile
): boolean {
  const usages = file
    .getDescendantsOfKind(ts.SyntaxKind.Identifier)
    .filter((node) => {
      const parent = node.getParent();
      return (
        node.getText() === identifier &&
        (parent?.getKind() === ts.SyntaxKind.PropertyAccessExpression ||
          parent?.getKind() === ts.SyntaxKind.QualifiedName)
      );
    });

  return usages.length > 0;
}

const targetDirectory = process.argv[2] || "src";
removeUnusedImports(targetDirectory);
