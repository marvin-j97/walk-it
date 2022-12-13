import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { afterAll, beforeAll } from "vitest";

export function setupFixture(files: string[]): { folder: string; files: string[] } {
  const createdFiles: string[] = [];
  const folder = `test/.fixture_${randomBytes(8).toString("hex")}`;

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
