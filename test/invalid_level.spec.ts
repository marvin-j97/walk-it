import { describe, expect, it } from "vitest";

import { walk, countFiles, walkFiles } from "../src";

describe("invalid params", async () => {
  it("walk maxLevel", async () => {
    await expect(async () => {
      for await (const _ of walk(".", { maxLevel: -1 }));
    }).rejects.toThrow("Invalid maxLevel: -1");
  });

  it("walkFiles maxLevel", async () => {
    await expect(async () => {
      for await (const _ of walkFiles(".", { maxLevel: -1 }));
    }).rejects.toThrow("Invalid maxLevel: -1");
  });

  it("countFiles maxLevel", async () => {
    await expect(async () => countFiles(".", { maxLevel: -1 })).rejects.toThrow(
      "Invalid maxLevel: -1",
    );
  });
});
