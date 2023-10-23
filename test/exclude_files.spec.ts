import { describe } from "vitest";

import { testWalk } from "./util";

describe("exclude files", async () => {
  testWalk(
    [
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
    ],
    {
      count: 9,
    },
    {
      // Exclude .rs files
      filterFile: ({ name }) => !name.endsWith(".rs"),
    },
  );
});
