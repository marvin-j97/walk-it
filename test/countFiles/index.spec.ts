import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { countFiles } from "../../src";

const fixtureFolder = resolve(__dirname, "fixture");

describe("count files", () => {
  describe("countFiles", () => {
    it("simple", async () => {
      const count = await countFiles(fixtureFolder);
      expect(count).to.equal(12);
    });

    it("non-recursively", async () => {
      const count = await countFiles(fixtureFolder, { recursive: false });
      expect(count).to.equal(5);
    });

    it("with level = 1", async () => {
      const count = await countFiles(fixtureFolder, { maxLevel: 1 });
      expect(count).to.equal(11);
    });

    it("exclude folders", async () => {
      const count = await countFiles(fixtureFolder, {
        // Exclude folders with digits in name
        excludeFolder: ({ name }) => /\d/.test(name),
      });
      expect(count).to.equal(11);
    });
  });
});
