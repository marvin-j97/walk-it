import { describe, expect, it } from "vitest";

import { createWalker } from "../../src/builder";
import { setupFixture } from "../util";

describe("extensions", () => {
  const { folder, files } = setupFixture([
    "0.txt",
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "nested/5.rs",
    "nested/6.rs",
    "nested/7.txt",
    "nested/8.txt",
    "nested/deep/9.rs",
    "another/5.txt",
    "another/6.txt",
    "another/7.txt",
    "another/8.txt",
    "another/9.json",
  ]);

  const walker = createWalker().path(folder).ext(".json").ext("rs");

  it("should work with walker", async () => {
    const count = await walker.count();
    expect(count).to.equal(4);
  });

  it("should only find fixture files", async () => {
    for await (const { path } of walker.files()) {
      expect(files).to.include(path);
    }
  });
});
