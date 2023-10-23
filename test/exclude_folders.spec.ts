import { describe } from "vitest";

import { testWalk } from "./util";

describe("exclude folders", async () => {
  testWalk(
    [
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
    ],
    {
      count: 6,
    },
    {
      // Exclude folder called "nested"
      excludeFolder: ({ name }) => name === "nested",
    },
  );
});
