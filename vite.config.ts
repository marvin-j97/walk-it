/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["json", "html", "text"],
      // TODO: "100" option is not supported (yet) for istanbul
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
