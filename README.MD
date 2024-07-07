# ts-remove-unused-imports

A TypeScript utility to remove unused imports from `.ts` and `.tsx` files in your project.

## Installation

You can install `ts-remove-unused-imports` as a development dependency in your project:

```bash
npm install --save-dev ts-remove-unused-imports
```

## Usage

You can use `ts-remove-unused-imports` by specifying a directory path where you want to remove unused imports. This utility uses TypeScript and `ts-morph` under the hood to parse and manipulate TypeScript source files.

### Adding to package.json

You can add `ts-remove-unused-imports` as an npm script in your `package.json`:

```json
{
  "scripts": {
    "remove-unused-imports": "ts-remove-unused-imports path/to/your/directory"
  }
}
```

Replace `path/to/your/directory` with the directory path where you want to remove unused imports.

### How It Works

1. **Initialization**: `ts-remove-unused-imports` initializes a TypeScript Project using `ts-morph` with your `tsconfig.json` settings.

2. **File Processing**: It traverses through `.ts` and `.tsx` files in the specified directory and its subdirectories.

3. **Import Removal**: For each file, it identifies and removes unused import statements:

   - Named imports are removed if none of their identifiers are used within the file.
   - Default and namespace imports are removed similarly if they are unused.

4. **Saving Changes**: After removing unused imports, it saves the modified files back to disk.

### Example

You can run `ts-remove-unused-imports` without installing it globally using `npx`:

```bash
npx ts-remove-unused-imports path/to/your/directory
```

This command will remove unused imports in the `path/to/your/directory` and its subdirectories.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or fixes.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Repository

Find this project on [GitHub](https://github.com/zemmelmootez/ts-remove-unused-imports).
