import { extname } from "node:path";
import type { Dirent } from "node:fs";

import type { FilterFn, FolderResult } from "./types";
import { countFiles, walk, walkFiles } from "./walk";

function normalizeExtension(ext: string): string {
  return ext.startsWith(".") ? ext : `.${ext}`;
}

function copyBuilder(prev: Builder, fn: (next: Builder) => void): Builder {
  const copy = Object.assign({}, prev);
  Object.setPrototypeOf(copy, Builder.prototype);
  fn(copy);
  return copy;
}

export class Builder {
  private paths: string[] = [];
  private extensions: string[] = [];
  private fileFilters: FilterFn[] = [];
  private folderFilters: FilterFn[] = [];
  private _limit: number | undefined = undefined;
  private recursive = true;

  flat(): Builder {
    return copyBuilder(this, (builder) => {
      builder.recursive = false;
    });
  }

  limit(limit: number): Builder {
    return copyBuilder(this, (builder) => {
      builder._limit = limit;
    });
  }

  path(path: string): Builder {
    return copyBuilder(this, (builder) => void builder.paths.push(path));
  }

  ext(ext: string): Builder {
    const normalized = normalizeExtension(ext);
    return copyBuilder(this, (builder) => void builder.extensions.push(normalized));
  }

  addFileFilter(fn: FilterFn) {
    return copyBuilder(this, (builder) => void builder.fileFilters.push(fn));
  }

  addFolderFilter(fn: FilterFn) {
    return copyBuilder(this, (builder) => void builder.folderFilters.push(fn));
  }

  private buildFileFilter(): FilterFn | undefined {
    return this.fileFilters.length || this.extensions.length
      ? (dirent, path, level) => {
          // Filter by extensions
          if (this.extensions.length) {
            const ext = extname(path);
            return this.extensions.includes(ext);
          }

          // Filter by custom filters
          return this.fileFilters.every((fn) => fn(dirent, path, level));
        }
      : undefined;
  }

  private buildFolderFilter(): FilterFn | undefined {
    return this.folderFilters.length
      ? (dirent, path, level) => {
          // Filter by custom filters
          return this.folderFilters.every((fn) => fn(dirent, path, level));
        }
      : undefined;
  }

  async *walk(): AsyncIterableIterator<FolderResult> {
    if (!this.paths.length) {
      throw new Error("No path defined: Use walker.path()");
    }

    for (const path of this.paths) {
      yield* walk(path, {
        filterFile: this.buildFileFilter(),
        filterFolder: this.buildFolderFilter(),
        maxLevel: this._limit,
        recursive: this.recursive,
      });
    }
  }

  async *files(): AsyncIterableIterator<{ path: string; file: Dirent }> {
    if (!this.paths.length) {
      throw new Error("No path defined: Use walker.path()");
    }

    for (const path of this.paths) {
      yield* walkFiles(path, {
        filterFile: this.buildFileFilter(),
        filterFolder: this.buildFolderFilter(),
        maxLevel: this._limit,
        recursive: this.recursive,
      });
    }
  }

  async count(): Promise<number> {
    if (!this.paths.length) {
      throw new Error("No path defined: Use walker.path()");
    }

    const counts = await Promise.all(
      this.paths.map((path) =>
        countFiles(path, {
          filterFile: this.buildFileFilter(),
          filterFolder: this.buildFolderFilter(),
          maxLevel: this._limit,
          recursive: this.recursive,
        }),
      ),
    );

    return counts.reduce((sum, x) => sum + x, 0);
  }
}

export function createWalker(): Builder {
  return new Builder();
}
