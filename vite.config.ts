/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["json", "html", "text"],
      thresholds: {
        "100": true
      },
    },
  },
});
