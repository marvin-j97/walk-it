import test from "ava";
import { resolve } from "path";

import walk from "../src";

const fixtureFolder = resolve("test/fixture");

test("Count files", async (t) => {
  await t.throwsAsync(async () => {
    for await (const _ of walk(fixtureFolder, { maxLevel: -1 })) {
    }
  });
});
