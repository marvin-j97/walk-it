import type { Dirent } from "node:fs";

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
   * Callback to filter folders
   *
   * Return `true` to include a folder, `false` to exclude
   *
   * ### Example
   *
   * Exclude node_modules:
   *
   * ```ts
   * {
   *   filterFolder: ({ name }) => name !== "node_modules",
   * }
   * ```
   */
  filterFolder?: (folder: Dirent, path: string) => boolean;

  /**
   * Callback to filter files
   *
   * Return `true` to include a file, `false` to exclude
   *
   * ### Example
   *
   * Only get `.rs` files:
   *
   * ```ts
   * {
   *   filterFile: ({ name }) => name.endsWith(".rs"),
   * }
   * ```
   */
  filterFile?: (file: Dirent, path: string) => boolean;
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
