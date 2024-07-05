# ts-remove-unused-imports

A TypeScript utility to remove unused imports from `.ts` and `.tsx` files in your project.

## Installation

You can install `ts-remove-unused-imports` as a development dependency in your project:

```bash
npm install --save-dev ts-remove-unused-imports
```

## Usage

### Command-Line Usage

You can run `ts-remove-unused-imports` from the command line with a directory argument:

```bash
ts-remove-unused-imports path/to/your/directory
```

Replace `path/to/your/directory` with the path to the directory where you want to remove unused imports.

### Adding to package.json

You can also add `ts-remove-unused-imports` as an npm script in your `package.json`:

```json
{
  "scripts": {
    "remove-unused-imports": "ts-remove-unused-imports path/to/your/directory"
  }
}
```

Replace `path/to/your/directory` with the directory path where you want to remove unused imports.

### How It Works

`ts-remove-unused-imports` uses TypeScript and `ts-morph` under the hood to parse and manipulate TypeScript source files. Here’s how it works:

1. **Initialization**: It initializes a TypeScript Project using `ts-morph` with your `tsconfig.json` settings.

2. **File Processing**: It traverses through `.ts` and `.tsx` files in the specified directory and its subdirectories.

3. **Import Removal**: For each file, it identifies and removes unused import statements:

   - Named imports are removed if none of their identifiers are used within the file.
   - Default and namespace imports are removed similarly if they are unused.

4. **Saving Changes**: After removing unused imports, it saves the modified files back to disk.

### Example

Here’s an example of using `ts-remove-unused-imports` in a TypeScript project:

```bash
ts-remove-unused-imports src
```

This command will remove unused imports in the `src` directory and its subdirectories.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or fixes.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Repository

Find this project on [GitHub](https://github.com/your-username/ts-remove-unused-imports).
