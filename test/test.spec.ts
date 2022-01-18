import test from "ava";
import { add } from "../src/add";

test("1 + 2 = 3", (t) => {
  const sum = add(1, 2);
  t.is(sum, 3);
});
