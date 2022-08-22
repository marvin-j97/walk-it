# walk-it

[![Node.js CI](https://github.com/marvin-j97/walk-it/actions/workflows/node.js.yml/badge.svg)](https://github.com/marvin-j97/walk-it/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/v/walk-it)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/walk-it)
[![codecov](https://codecov.io/gh/marvin-j97/walk-it/branch/master/graph/badge.svg?token=ExVQZnlhqk)](https://codecov.io/gh/marvin-j97/walk-it)

Recursive file **walk-it**erator. Requires Node 12+.

## Install

```bash
npm i walk-it
yarn add walk-it
```

## Default behaviour

By default, all folders will be visited recursively starting at the given directory.

Note that subfolders are visited _eagerly_, meaning the _level_ is not sorted (aka. [pre-order traversal is used instead of level-order](https://en.wikipedia.org/wiki/Tree_traversal)).

## Usage & examples

#### Walk all folders recursively

```typescript
import walk from "walk-it";

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

for await (const file of walkFiles(dir)) {
  // file is the absolute path of the visited file
  console.log(file);
}
```

#### Limit recursive descent

```typescript
import walk from "walk-it";

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
import walk from "walk-it";

for await (const x of walk(dir, { recursive: false })) {
  console.log(x);
}
```

#### Blacklist folders

```typescript
import walk from "walk-it";

for await (const x of walk(".", {
  excludeFolder: (folder) => ["node_modules", ".git"].includes(folder),
})) {
  console.log(x);
}
```

_excludeFolder_ should be preferred over filtering after walking because it will stop the recursive descent, thus increasing performance.

#### Count files

```typescript
import walk from "walk-it";

async function countFiles(dir: string): Promise<number> {
  let count = 0;
  for await (const { files } of walk(".")) {
    count += files.length;
  }
  return count;
}

countFiles(".")
  .then(count => console.log(`${count} files found`));
```
