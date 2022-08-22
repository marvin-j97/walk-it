import { describe, expect, it } from "vitest";
import { resolve } from "path";

import walk, { countFiles, walkFiles } from "../src";

const fixtureFolder = resolve("test/fixture");

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
        excludeFolder: (folder) => /\d/.test(folder),
      })) {
        count += files.length;
      }
      expect(count).to.equal(11);
    });
  });

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
        excludeFolder: (folder) => /\d/.test(folder),
      })) {
        count++;
      }
      expect(count).to.equal(11);
    });
  });

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
        excludeFolder: (folder) => /\d/.test(folder),
      });
      expect(count).to.equal(11);
    });
  });
});
