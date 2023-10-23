import { describe } from "vitest";

import { testWalk } from "./util";

describe("limited depth", () => {
  testWalk(
    [
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
    ],
    {
      count: 9,
    },
    {
      maxLevel: 1,
    },
  );
});
