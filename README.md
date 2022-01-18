# walk-it

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
  console.log(x);
}
```

#### Get files only

```typescript
import { walkFiles } from "walk-it";

for await (const file of walkFiles(dir)) {
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
for await (const x of walk(".", {
  excludeFolder: (folder) => ["node_modules", ".git"].includes(folder),
})) {
  console.log(x);
}
```

#### Count files

```typescript
let count = 0;
for await (const { files } of walk(".")) {
  count += files.length;
}
console.log(`${count} files found`);
```
