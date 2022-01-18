import test from "ava";
import { resolve } from "path";

import walk, { walkFiles } from "../src";

const fixtureFolder = resolve("test/fixture");

test("Count files", async (t) => {
  let count = 0;
  for await (const { files } of walk(fixtureFolder)) {
    count += files.length;
  }
  t.is(count, 9);
});

test("Count files non-recursively", async (t) => {
  let count = 0;
  for await (const { files } of walk(fixtureFolder, { recursive: false })) {
    count += files.length;
  }
  t.is(count, 5);
});

test("Count files with level = 1", async (t) => {
  let count = 0;
  for await (const { files } of walk(fixtureFolder, { maxLevel: 1 })) {
    count += files.length;
    console.log(files);
  }
  t.is(count, 8);
});

test("Count files with exclude folders", async (t) => {
  let count = 0;
  for await (const { files } of walk(fixtureFolder, {
    // Exclude folders with digits in name
    excludeFolder: (folder) => /\d/.test(folder),
  })) {
    count += files.length;
  }
  t.is(count, 8);
});

test("Use walkFiles", async (t) => {
  let count = 0;
  for await (const _ of walkFiles(fixtureFolder)) {
    count++;
  }
  t.is(count, 9);
});
