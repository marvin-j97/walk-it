import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { walk } from "../../src";

const fixtureFolder = resolve(__dirname, "fixture");

describe("count files", () => {
  describe("walk", () => {
    it("simple", async () => {
      let count = 0;
      for await (const { files } of walk(fixtureFolder)) {
        count += files.length;
      }
      expect(count).to.equal(12);
    });

    it("non-recursively", async () => {
      let count = 0;
      for await (const { files } of walk(fixtureFolder, { recursive: false })) {
        count += files.length;
      }
      expect(count).to.equal(5);
    });

    it("with level = 1", async () => {
      let count = 0;
      for await (const { files } of walk(fixtureFolder, { maxLevel: 1 })) {
        count += files.length;
      }
      expect(count).to.equal(11);
    });

    it("exclude folders", async () => {
      let count = 0;
      for await (const { files } of walk(fixtureFolder, {
        // Exclude folders with digits in name
        excludeFolder: ({ name }) => /\d/.test(name),
      })) {
        count += files.length;
      }
      expect(count).to.equal(11);
    });
  });
});
