import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { FolderResult, Options } from "./types";

const DEFAULT_OPTIONS: Options = {
  recursive: true,
};

async function* emitFolder(
  dir: string,
  opts?: Options,
  level = 0,
): AsyncIterableIterator<FolderResult> {
  const resolvedDir = resolve(dir);
  const { recursive, maxLevel, includeFolder, excludeFolder, includeFile, excludeFile } =
    opts ?? DEFAULT_OPTIONS;

  if (maxLevel && maxLevel < 0) {
    throw new Error(`Invalid maxLevel: ${maxLevel}`);
  }

  const dirents = await readdir(resolvedDir, { withFileTypes: true });

  const files = dirents.filter((dirent) => {
    if (dirent.isDirectory()) {
      return false;
    }

    const path = resolve(resolvedDir, dirent.name);

    if (includeFile && !includeFile(dirent, path)) {
      return false;
    }
    if (excludeFile?.(dirent, path)) {
      return false;
    }
    return true;
  });

  const folders = dirents.filter((dirent) => dirent.isDirectory());

  yield {
    dir: resolvedDir,
    files,
    folders,
    level,
  };

  if (recursive ?? true) {
    for (const dirent of folders) {
      const path = resolve(resolvedDir, dirent.name);

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

/**
 * Walks a folder (optionally recursively), emitting one folder at a time
 *
 * @param {string} dir Directory to walk
 * @param {Options} opts Walk options
 *
 * @returns Async iterator
 */
export async function* walk(dir: string, opts?: Options): AsyncIterableIterator<FolderResult> {
  yield* emitFolder(dir, opts);
}

/**
 * Walks a folder (optionally recursively), emitting one file at a time
 *
 * @param {string} dir Directory to walk
 * @param {Options} opts Walk options
 *
 * @returns Async iterator
 */
export async function* walkFiles(
  dir: string,
  opts?: Options,
): AsyncIterableIterator<{ path: string; file: Dirent }> {
  for await (const { dir: folderDir, files } of walk(dir, opts)) {
    for (const file of files) {
      yield {
        path: resolve(folderDir, file.name),
        file,
      };
    }
  }
}

/**
 * Returns the file count of a folder
 *
 * @param {string} dir Directory to walk
 * @param {Options} opts Walk options
 *
 * @returns {number} File count
 */
export async function countFiles(dir: string, opts?: Options): Promise<number> {
  let count = 0;
  for await (const { files } of walk(dir, opts)) {
    count += files.length;
  }
  return count;
}
