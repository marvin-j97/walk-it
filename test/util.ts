import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { afterAll, beforeAll, expect, it } from "vitest";
import { type Options, countFiles, walkFiles } from "../src";

export function setupFixture(files: string[]): { folder: string; files: string[] } {
  const createdFiles: string[] = [];
  const folder = `test/.fixture/${randomBytes(4).toString("hex")}`;

  beforeAll(() => {
    console.error(`Setup fixture folder ${folder}`);

    if (existsSync(folder)) {
      rmSync(folder, { recursive: true });
    }
    mkdirSync(folder, { recursive: true });

    for (const file of files) {
      const path = resolve(folder, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, "");
      createdFiles.push(path);
    }
  });

  afterAll(() => {
    console.error(`Teardown fixture folder ${folder}`);

    if (existsSync(folder)) {
      rmSync(folder, { recursive: true });
    }
  });

  return { folder, files: createdFiles };
}

type Expected = {
  count: number;
};

export function testWalk(inputFiles: string[], expected: Expected, opts?: Options) {
  const { folder, files } = setupFixture(inputFiles);

  it("should have correct file count", async () => {
    const count = await countFiles(folder, opts);
    expect(count).to.equal(expected.count);
  });

  it("should only find fixture files", async () => {
    for await (const { path } of walkFiles(folder, opts)) {
      expect(files).to.include(path);
    }
  });
}
