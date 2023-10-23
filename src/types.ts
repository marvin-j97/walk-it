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
   * Callback to whitelist folders
   */
  includeFolder?: (folder: Dirent, path: string) => boolean;

  /**
   * Callback to blacklist folders
   *
   * excludeFolder should be preferred over filtering after walking because it will stop the recursive descent, thus increasing performance
   */
  excludeFolder?: (folder: Dirent, path: string) => boolean;

  /**
   * Callback to whitelist files
   */
  includeFile?: (file: Dirent, path: string) => boolean;

  /**
   * Callback to blacklist files
   */
  excludeFile?: (file: Dirent, path: string) => boolean;
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
