import { describe, expect, it } from "vitest";

import { countFiles, walkFiles } from "../src";
import { setupFixture } from "./util";

describe("include folders", async () => {
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

  it("include folders", async () => {
    const count = await countFiles(folder, {
      // Include folder called "nested" or "deep"
      includeFolder: ({ name }) => name === "nested" || name === "deep",
    });
    expect(count).to.equal(10);
  });

  it("should list all files", async () => {
    for await (const { path } of walkFiles(folder)) {
      expect(files).to.include(path);
    }
  });
});
