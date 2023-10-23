import { describe } from "vitest";

import { testWalk } from "./util";

describe("include folders", async () => {
  testWalk(
    [
      "0.txt",
      "1.txt",
      "2.txt",
      "3.txt",
      "4.txt",
      "this_will_not_be_walked/10.txt",
      "this_will_not_be_walked/nested/10.txt",
      "nested/5.txt",
      "nested/6.txt",
      "nested/7.txt",
      "nested/8.txt",
      "nested/deep/9.txt",
    ],
    {
      count: 10,
    },
    {
      // Include folder called "nested" or "deep"
      filterFolder: ({ name }) => ["nested", "deep"].includes(name),
    },
  );
});
