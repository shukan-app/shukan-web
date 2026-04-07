import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 120,
  ignorePatterns: [
    ".agents/**",
    ".github/**",
    ".husky/**",
    ".react-router/**",
    ".vscode/**",
    "dist/**",
    "build/**",
    "node_modules/**",
  ],
});
