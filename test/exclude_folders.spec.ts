import { describe } from "vitest";

import { testWalk } from "./util";
import { createWalker } from "../src/builder";
import { FilterFn } from "../src";

// Exclude folder called "nested"
const filterFolder: FilterFn = ({ name }) => name !== "nested";

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
      walker: createWalker().addFolderFilter(filterFolder),
    },
    {
      filterFolder,
    },
  );
});
