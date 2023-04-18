import type { Dirent } from "node:fs";

export interface ScanOptions {
  recursive?: boolean;
  maxLevel?: number;
  includeFolder?: (folder: Dirent, path: string) => boolean;
  excludeFolder?: (folder: Dirent, path: string) => boolean;
  includeFile?: (file: Dirent, path: string) => boolean;
  excludeFile?: (file: Dirent, path: string) => boolean;
}

export interface FolderResult {
  dir: string;
  files: Dirent[];
  folders: Dirent[];
  level: number;
}
