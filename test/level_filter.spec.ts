import { describe } from "vitest";

import { testWalk } from "./util";

describe("get files where level = 2", async () => {
  testWalk(
    [
      "0.txt",
      "1.txt",
      "2.txt",
      "3.txt",
      "4.txt",
      "another_folder/10.txt",
      "another_folder/nested/10.txt",
      "nested/5.txt",
      "nested/6.txt",
      "nested/7.txt",
      "nested/8.txt",
      "nested/deep/9.txt",
    ],
    {
      count: 2,
    },
    {
      // Include all files in subfolders of level 2 (sub-sub-folders)
      filterFile: (_dirent, _path, level) => level === 2,
    },
  );
});
