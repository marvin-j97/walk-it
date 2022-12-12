import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { walkFiles } from "../../src";

const fixtureFolder = resolve(__dirname, "fixture");

describe("count files", () => {
  describe("walkFiles", () => {
    it("simple", async () => {
      let count = 0;
      for await (const _ of walkFiles(fixtureFolder)) {
        count++;
      }
      expect(count).to.equal(12);
    });

    it("non-recursively", async () => {
      let count = 0;
      for await (const _ of walkFiles(fixtureFolder, { recursive: false })) {
        count++;
      }
      expect(count).to.equal(5);
    });

    it("with level = 1", async () => {
      let count = 0;
      for await (const _ of walkFiles(fixtureFolder, { maxLevel: 1 })) {
        count++;
      }
      expect(count).to.equal(11);
    });

    it("exclude folders", async () => {
      let count = 0;
      for await (const _ of walkFiles(fixtureFolder, {
        // Exclude folders with digits in name
        excludeFolder: ({ name }) => /\d/.test(name),
      })) {
        count++;
      }
      expect(count).to.equal(11);
    });
  });
});
