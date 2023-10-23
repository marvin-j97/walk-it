# walk-it

[![TS ready](https://img.shields.io/static/v1?label=&message=TS+ready&color=000000&logo=typescript)]()
[![ESM ready](https://img.shields.io/static/v1?label=&message=ESM+ready&color=%23000000&logo=javascript)]()
[![Deno ready](https://img.shields.io/static/v1?label=&message=Deno+ready&color=%23000000&logo=deno)]()
[![Bun ready](https://img.shields.io/static/v1?label=&message=Bun+ready&color=%23000000&logo=bun)]()
[![Node.js CI](https://github.com/marvin-j97/walk-it/actions/workflows/node.js.yml/badge.svg)](https://github.com/marvin-j97/walk-it/actions/workflows/node.js.yml)
[![npm](https://img.shields.io/npm/v/walk-it)](https://www.npmjs.com/package/walk-it)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/walk-it)](https://bundlephobia.com/package/walk-it)
[![codecov](https://codecov.io/gh/marvin-j97/walk-it/branch/main/graph/badge.svg?token=ExVQZnlhqk)](https://codecov.io/gh/marvin-j97/walk-it)
![GitHub](https://img.shields.io/github/license/marvin-j97/walk-it)

Recursive file **walk-it**erator. Requires Node 18+, Deno or Bun.

## Install (Node)

```bash
npm i walk-it
yarn add walk-it
pnpm i walk-it
```

## Install (Bun)

```bash
bun install walk-it
```

## Deno usage

```typescript
import { walk } from "npm:walk-it";
```

## Default behaviour

By default, all folders will be visited recursively starting at the given directory.

Note that subfolders are visited _eagerly_, meaning the _level_ is not sorted (aka. [pre-order traversal is used instead of level-order](https://en.wikipedia.org/wiki/Tree_traversal)).

## Usage & examples

#### Walk all folders recursively

```typescript
import { walk } from "walk-it";

for await (const x of walk(dir)) {
  // x contains:
  // dir    : the scanned folder's absolute path
  // files  : files as directory entries (Dirent)
  // folders: folders as directory entries (Dirent)
  // level  : the tree level (0 being the start directory)
  console.log(x);
}
```

#### Get files only

```typescript
import { walkFiles } from "walk-it";

for await (const { file, path } of walkFiles(dir)) {
  // file is a Dirent object
  // path is the absolute path of the visited file
  console.log(file, path);
}
```

#### Limit recursive descent

```typescript
import { walk } from "walk-it";

// 0 = Only output 'dir'
// 1 = Descent once
// 2 = Descent twice
// ...
for await (const x of walk(dir, { maxLevel: 2 })) {
  console.log(x);
}
```

#### Disable recursive descent altogether

Same as maxLevel = 0

```typescript
import { walk } from "walk-it";

for await (const x of walk(dir, { recursive: false })) {
  console.log(x);
}
```

#### Whitelist files by extension

```typescript
import { walk } from "walk-it";

for await (const x of walk(".", {
  filterFile: ({ name }) => name.endsWith(".jpg"),
})) {
  console.log(x);
}
```

#### Blacklist folders

```typescript
import { walk } from "walk-it";

for await (const x of walk(".", {
  filterFolder: ({ name }) => !["node_modules", ".git"].includes(name),
})) {
  console.log(x);
}
```

_excludeFolder_ should be preferred over filtering after walking because it will stop the recursive descent, thus increasing performance.

#### Count files

```typescript
import { countFiles } from "walk-it";

const count = await countFiles(".");
console.log(`${count} files found`);

const count = await countFiles(".", {
  // You can also use the same options as walk and walkFiles
  filterFolder: ({ name }) => !["node_modules", ".git"].includes(name),
});
console.log(`${count} files found`);
```
