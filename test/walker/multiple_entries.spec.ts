import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { createWalker } from "../../src/builder";
import { setupFixture } from "../util";

describe("multiple entry folders", () => {
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
    "another/5.txt",
    "another/6.txt",
    "another/7.txt",
    "another/8.txt",
    "another/9.txt",
    "will_not_be_walked/1.txt",
  ]);

  const walker = createWalker().path(resolve(folder, "nested")).path(resolve(folder, "another"));

  it("should work with walker", async () => {
    const count = await walker.count();
    expect(count).to.equal(10);
  });

  it("should only find fixture files", async () => {
    for await (const { path } of walker.files()) {
      expect(files).to.include(path);
    }
  });
});
