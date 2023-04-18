import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { FolderResult, ScanOptions } from "./types";
import { isDir } from "./util";

const DEFAULT_OPTIONS: ScanOptions = {
  recursive: true,
};

/**
 * Walks a folder (optionally recursively), emitting one folder at a time
 */
async function* emitFolder(
  dir: string,
  opts?: ScanOptions,
  level = 0,
): AsyncIterableIterator<FolderResult> {
  dir = resolve(dir);
  const { recursive, maxLevel, includeFolder, excludeFolder, includeFile, excludeFile } =
    opts ?? DEFAULT_OPTIONS;

  if (maxLevel && maxLevel < 0) {
    throw new Error(`Invalid maxLevel: ${maxLevel}`);
  }

  const dirents = await readdir(dir, { withFileTypes: true });

  const files = dirents.filter((dirent) => {
    if (isDir(dirent)) {
      return false;
    }

    const path = resolve(dir, dirent.name);

    if (includeFile && !includeFile(dirent, path)) {
      return false;
    }
    if (excludeFile?.(dirent, path)) {
      return false;
    }
    return true;
  });

  const folders = dirents.filter(isDir);

  yield {
    dir,
    files,
    folders,
    level,
  };

  if (recursive ?? true) {
    for (const dirent of folders) {
      const path = resolve(dir, dirent.name);

      if (includeFolder && !includeFolder(dirent, path)) {
        continue;
      }
      if (excludeFolder?.(dirent, path)) {
        continue;
      }

      const nextLevel = level + 1;
      if (typeof maxLevel === "number" && nextLevel > maxLevel) {
        continue;
      }

      yield* emitFolder(path, opts, level + 1);
    }
  }
}

export async function* walk(dir: string, opts?: ScanOptions): AsyncIterableIterator<FolderResult> {
  yield* emitFolder(dir, opts);
}

export async function* walkFiles(
  inputDir: string,
  opts?: ScanOptions,
): AsyncIterableIterator<{ path: string; file: Dirent }> {
  for await (const { dir, files } of walk(inputDir, opts)) {
    for (const file of files) {
      yield {
        path: resolve(dir, file.name),
        file,
      };
    }
  }
}

export async function countFiles(dir: string, opts?: ScanOptions): Promise<number> {
  let count = 0;
  for await (const { files } of walk(dir, opts)) {
    count += files.length;
  }
  return count;
}
