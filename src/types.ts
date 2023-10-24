import type { Dirent } from "node:fs";

export type FilterFn = (dirent: Dirent, path: string, level: number) => boolean;

/**
 * Walk options
 */
export interface Options {
  /**
   * Walk folder recursively
   *
   * Sub folders will be visited eagerly
   *
   * Same as maxLevel = 0, when false
   */
  recursive?: boolean;

  /**
   * Max level of recursion
   *
   * 0 = Only output base directory
   * 1 = Descent once
   * 2 = Descent twice
   */
  maxLevel?: number;

  /**
   * Filter function for folders. Return `true` to include a folder, `false` to exclude.
   *
   * @param folder Directory entry
   * @param path Absolute path of folder
   * @param level Folder depth, relative to the starting folder - use maxLevel if you want to limit the folder descent
   *
   * @example Exclude node_modules
   *
   * { filterFolder: ({ name }) => name !== "node_modules" }
   */
  filterFolder?: FilterFn;

  /**
   * Filter function for files. Return `true` to include a file, `false` to exclude.
   *
   * @param folder Directory entry
   * @param path Absolute path of file
   * @param level Folder depth, relative to the starting folder
   *
   * @example Only get `.rs` files:
   *
   * { filterFile: ({ name }) => name.endsWith(".rs") }
   */
  filterFile?: FilterFn;
}

/**
 * Information about visited folder
 */
export interface FolderResult {
  /**
   * Absolute path of folder
   */
  dir: string;

  /**
   * Files as directory entries (Dirent)
   */
  files: Dirent[];

  /**
   * Folders as directory entries (Dirent)
   */
  folders: Dirent[];

  /**
   * The tree level (0 being the start directory)
   */
  level: number;
}
