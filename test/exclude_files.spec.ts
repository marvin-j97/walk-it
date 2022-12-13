import { describe, expect, it } from "vitest";

import { countFiles, walkFiles } from "../src";
import { setupFixture } from "./util";

describe("exclude files", async () => {
  const { folder, files } = setupFixture([
    "0.rs",
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "otherfolder/10.rs",
    "otherfolder/nested/10.rs",
    "nested/5.txt",
    "nested/6.txt",
    "nested/7.txt",
    "nested/8.txt",
    "nested/deep/9.txt",
  ]);

  it("exclude files", async () => {
    const count = await countFiles(folder, {
      // Exclude .rs files
      excludeFile: ({ name }) => name.endsWith(".rs"),
    });
    expect(count).to.equal(9);
  });

  it("should list all files", async () => {
    for await (const path of walkFiles(folder)) {
      expect(files).to.include(path);
    }
  });
});
