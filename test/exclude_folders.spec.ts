import { describe, expect, it } from "vitest";

import { countFiles, walkFiles } from "../src";
import { setupFixture } from "./util";

describe("exclude folders", async () => {
  const { folder, files } = setupFixture([
    "0.txt",
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "otherfolder/10.txt",
    "otherfolder/nested/10.txt",
    "nested/5.txt",
    "nested/6.txt",
    "nested/7.txt",
    "nested/8.txt",
    "nested/deep/9.txt",
  ]);

  it("exclude folders", async () => {
    const count = await countFiles(folder, {
      // Exclude folder called "nested"
      excludeFolder: ({ name }) => name === "nested",
    });
    expect(count).to.equal(6);
  });

  it("should list all files", async () => {
    for await (const path of walkFiles(folder)) {
      expect(files).to.include(path);
    }
  });
});
