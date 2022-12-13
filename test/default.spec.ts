import { describe, expect, it } from "vitest";

import { countFiles, walkFiles } from "../src";
import { setupFixture } from "./util";

describe("default options", () => {
  const { folder, files } = setupFixture([
    "0.txt",
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "nested/5.txt",
    "nested/6.txt",
    "nested/7.txt",
    "nested/8.txt",
    "nested/deep/9.txt",
  ]);

  it("should count 10 files", async () => {
    const count = await countFiles(folder);
    expect(count).to.equal(10);
  });

  it("should list all files", async () => {
    for await (const path of walkFiles(folder)) {
      expect(files).to.include(path);
    }
  });
});