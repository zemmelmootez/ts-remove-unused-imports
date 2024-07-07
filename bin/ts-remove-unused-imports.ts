#!/usr/bin/env ts-node

import { Command } from "commander";
import { removeUnusedImports } from "../src";

const program = new Command();

program
  .version("1.0.0")
  .description("CLI to remove unused imports from TypeScript and TSX files")
  .argument("<directory>", "directory to process")
  .action((directory) => {
    removeUnusedImports(directory);
  });

program.parse(process.argv);
