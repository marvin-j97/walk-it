import { describe, expect, it } from "vitest";
import { resolve } from "path";

import walk, { walkFiles, countFiles } from "../src";

const fixtureFolder = resolve("test/fixture");

describe("invalid params", async () => {
  it("walk maxLevel", async () => {
    await expect(async () => {
      for await (const _ of walk(fixtureFolder, { maxLevel: -1 }));
    }).rejects.toThrow("Invalid maxLevel: -1");
  });

  it("walkFiles maxLevel", async () => {
    await expect(async () => {
      for await (const _ of walkFiles(fixtureFolder, { maxLevel: -1 }));
    }).rejects.toThrow("Invalid maxLevel: -1");
  });

  it("countFiles maxLevel", async () => {
    await expect(async () => countFiles(fixtureFolder, { maxLevel: -1 })).rejects.toThrow(
      "Invalid maxLevel: -1",
    );
  });
});
