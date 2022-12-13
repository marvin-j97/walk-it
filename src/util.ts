import type { Dirent } from "node:fs";

export function isDir(dirent: Dirent): boolean {
  return dirent.isDirectory();
}
