/**
 * @module
 *
 * Async file walk iterator.
 *
 * ```ts
 * import { walk } from "walk-it";
 *
 * for await (const x of walk(dir)) {
 *   console.log(x);
 * }
 * ```
 */

export * from "./types";
export * from "./walk";
