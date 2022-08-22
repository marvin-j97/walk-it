import fs, { Dirent } from "fs";
import { resolve } from "path";

const readdir = fs.promises.readdir;

interface IScanOptions {
  recursive?: boolean;
  maxLevel?: number;
  excludeFolder?: (folder: string) => boolean;
}

interface IFolderResult {
  dir: string;
  files: Dirent[];
  folders: Dirent[];
  level: number;
}

function isDir(dirent: Dirent): boolean {
  return dirent.isDirectory();
}

/**
 * Walks a folder (optionally recursively), emitting one folder at a time
 */
async function* emitFolder(
  dir: string,
  opts?: IScanOptions,
  level = 0,
): AsyncIterableIterator<IFolderResult> {
  const { recursive, maxLevel, excludeFolder } = opts || {
    recursive: true,
  };

  if (maxLevel && maxLevel < 0) {
    throw new Error(`Invalid maxLevel: ${maxLevel}`);
  }

  const dirents = await readdir(dir, { withFileTypes: true });

  const files = dirents.filter((x) => !isDir(x));
  const folders = dirents.filter(isDir);

  yield {
    dir: resolve(dir),
    files,
    folders,
    level,
  };

  if (recursive ?? true) {
    for (const { name } of folders) {
      if (excludeFolder?.(name)) {
        continue;
      }
      const nextLevel = level + 1;
      if (typeof maxLevel === "number" && nextLevel > maxLevel) {
        continue;
      }
      yield* emitFolder(resolve(dir, name), opts, level + 1);
    }
  }
}

export default async function* walk(
  dir: string,
  opts?: IScanOptions,
): AsyncIterableIterator<IFolderResult> {
  yield* emitFolder(dir, opts);
}

export async function* walkFiles(dir: string, opts?: IScanOptions): AsyncIterableIterator<string> {
  for await (const x of walk(dir, opts)) {
    for (const file of x.files) {
      yield resolve(x.dir, file.name);
    }
  }
}

export async function countFiles(dir: string, opts?: IScanOptions): Promise<number> {
  let count = 0;
  for await (const { files } of walk(dir, opts)) {
    count += files.length;
  }
  return count;
}
