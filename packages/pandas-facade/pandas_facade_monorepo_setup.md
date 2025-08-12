# Monorepo: `pandas-facade`

Below is a complete starter you can paste into a fresh repo. It creates a TypeScript facade package that wraps the **pandas-js** library, re-exports its API with rich typings, and adds a few extra typed utilities—without changing the runtime behavior.

---

## Tree

```
.
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .gitignore
├── README.md
└── packages
    └── pandas-facade
        ├── package.json
        ├── tsconfig.json
        ├── tsup.config.ts
        ├── src
        │   ├── index.ts
        │   ├── pandas-augment.d.ts
        │   ├── new-features.ts
        │   └── internal
        │       └── utils.ts
        ├── tests
        │   └── basic.test.ts
        ├── vitest.config.ts
        └── README.md
```

> Uses **pnpm workspaces** (swap for npm/yarn if you prefer) and **tsup** to build dual ESM/CJS with `.d.ts` output. Vitest is configured for quick sanity checks.

---

## Root files

### `package.json`

```json
{
  "name": "pandas-facade-monorepo",
  "private": true,
  "version": "0.1.0",
  "license": "MIT",
  "packageManager": "pnpm@9.6.0",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "pnpm -C packages/pandas-facade build",
    "test": "pnpm -C packages/pandas-facade test",
    "lint": "pnpm -C packages/pandas-facade lint"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
```

### `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### `.gitignore`

```
node_modules
.DS_Store
*.log
*.tsbuildinfo
coverage
packages/**/dist
```

### `README.md`

````md
# pandas-facade monorepo

This monorepo hosts a typed facade around the legacy `pandas-js` package. The facade preserves runtime behavior while providing modern TypeScript types and a few opt-in utilities.

## Packages
- `packages/pandas-facade` – import from here in your apps.

## Quick start
```bash
pnpm i
pnpm -C packages/pandas-facade build
````

````

---

## Package: `packages/pandas-facade`

### `package.json`
```json
{
  "name": "pandas-facade",
  "version": "0.1.0",
  "description": "Typed facade for pandas-js with additional utilities",
  "license": "MIT",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean",
    "test": "vitest run",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0"
  },
  "peerDependencies": {
    "immutable": ">=4.0.0"
  },
  "dependencies": {
    "pandas-js": "^0.2.4"
  },
  "devDependencies": {
    "@types/node": "^20.12.7",
    "eslint": "^9.7.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "tsup": "^8.1.0",
    "typescript": "^5.5.4",
    "vitest": "^2.0.0"
  }
}
````

### `tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["dist", "tests"]
}
```

### `tsup.config.ts`

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  treeshake: true
})
```

### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node'
  }
})
```

---

## Source code

### `src/pandas-augment.d.ts`

> Provides TypeScript shape for the **existing** `pandas-js` API (Series/DataFrame). Based on official docs. It’s not 100% exhaustive but covers the commonly used surface and is easy to extend.

```ts
// Ambient module typing for the runtime package we wrap
// Reference: https://stratodem.github.io/pandas.js-docs/

declare module 'pandas-js' {
  import type { List, Map as ImMap } from 'immutable'

  export class DType {
    constructor(name: string)
    toString(): string
  }

  export class Series<T = any> {
    constructor(data: Iterable<T> | T[], kwargs?: { name?: string; index?: (string | number)[] })

    // properties
    name: string
    index: (string | number)[]
    readonly length: number
    readonly dtype: DType

    // basic IO / debug
    toString(): string
    to_json(): string
    values(): T[]
    head(n?: number): Series<T>
    tail(n?: number): Series<T>

    // elementwise math / compare (narrow subset)
    abs(): Series<number>
    add(other: number | Iterable<number> | Series<number>): Series<number>
    sub(other: number | Iterable<number> | Series<number>): Series<number>
    mul(other: number | Iterable<number> | Series<number>): Series<number>
    div(other: number | Iterable<number> | Series<number>): Series<number>

    // stats
    sum(): number
    mean(): number
    median(): number
    std(): number
    variance(): number

    // transforms
    map<U>(fn: (v: T, i: number) => U): Series<U>
    filter(fn: (v: T, i: number) => boolean): Series<T>
    round(places?: number): Series<number>
    rename(name: string): Series<T>
    copy(): Series<T>

    // alignment helpers
    append(other: Series<T>, ignore_index?: boolean): Series<T>
    unique(): Series<T>

    // indexing
    iloc(i: number): T
  }

  export type Row = Record<string, any>

  export class DataFrame<T extends Row = Row> {
    constructor(rows: T[] | List<T>, kwargs?: { index?: (string | number)[]; columns?: string[] })

    // properties
    index: (string | number)[]
    columns(): string[]
    length: number

    // basic IO
    to_json(): string
    to_csv(): string
    to_excel(): string
    toString(): string
    values(): T[]

    // selection & iteration
    get(col: keyof T & string): Series<T[keyof T]>
    set<K extends string & keyof any>(col: K, series: Series<any> | any[] | List<any>): DataFrame<T & Record<K, any>>
    iterrows(): IterableIterator<[number, T]>
    head(n?: number): DataFrame<T>
    tail(n?: number): DataFrame<T>
    copy(): DataFrame<T>

    // math & stats (subset)
    sum(): Series<number>
    mean(): Series<number>
    std(): Series<number>
    variance(): Series<number>

    // reshape / combine (subset)
    append(df: DataFrame<T>): DataFrame<T>
    merge<U extends Row>(other: DataFrame<U>): DataFrame<T & U>
    transpose(): DataFrame<any>

    // index ops (subset)
    reset_index(args?: { drop?: boolean }): DataFrame<T>
    rename(args: { columns: ImMap<string, string> }): DataFrame<T>
    iloc(i: number): T
  }
}
```

> You can extend this file as you touch more of the legacy API. Because it’s an **ambient** declaration, consumers of your facade get types automatically when they import from `pandas-facade` (see `src/index.ts`).

---

### `src/internal/utils.ts`

```ts
export function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

export type Keys<T> = Extract<keyof T, string>
```

### `src/new-features.ts`

> New typed utilities that sit **on top** of pandas-js objects. These are pure wrappers—no behavioral changes to the underlying lib.

```ts
import { DataFrame, Series } from 'pandas-js'
import { Keys } from './internal/utils'

/** Narrow a DataFrame to a stronger row type without changing data at runtime. */
export function asTyped<T extends Record<string, any>>(df: DataFrame<any>): DataFrame<T> {
  return df as unknown as DataFrame<T>
}

/** Create a DataFrame from an array of objects with inferred keys. */
export function fromRecords<T extends Record<string, any>>(rows: T[]): DataFrame<T> {
  return new DataFrame<T>(rows)
}

/** Safe column selection: errors at compile time if the column name is wrong. */
export function select<T extends Record<string, any>, K extends Keys<T>>(df: DataFrame<T>, ...cols: K[]): DataFrame<Pick<T, K>> {
  const rows = df.values().map((r) => {
    const out: any = {}
    for (const c of cols) out[c] = (r as any)[c]
    return out
  })
  return new DataFrame(rows)
}

/** Convert a Series to a typed array */
export function toArray<T>(s: Series<T>): T[] {
  return s.values()
}

/** Pipe style helper \u2014 improves chainability in TS */
export function pipe<T>(value: T, ...fns: Array<(v: T) => T>): T {
  return fns.reduce((v, fn) => fn(v), value)
}
```

### `src/index.ts`

> The façade: re-export all runtime classes from `pandas-js`, but give them types via the ambient declaration; also export the new utilities.

```ts
// Re-export runtime from pandas-js (JS lib) \u2014 our ambient d.ts supplies types
export { Series, DataFrame, DType } from 'pandas-js'

// New, typed utilities
export * from './new-features'
```

---

## Tests (smoke)

### `tests/basic.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { DataFrame, Series, asTyped, select, toArray } from '../src'

interface Row { a: number; b: number; c?: string }

describe('pandas-facade', () => {
  it('types Series math', () => {
    const s = new Series([1, 2, 3])
    const s2 = s.add(1).mul(2)
    expect(toArray(s2)).toEqual([4, 6, 8])
  })

  it('types DataFrame select', () => {
    const df = new DataFrame<Row>([
      { a: 1, b: 2 },
      { a: 3, b: 4 }
    ])

    // typed narrowing
    const narrow = select(df, 'a')
    expect(narrow.columns()).toEqual(['a'])

    // compile-time error if you uncomment (unknown column):
    // select(df, 'z')

    // asTyped example
    const df2 = asTyped<Row>(df)
    expect(df2.head(1).values()[0].a).toBe(1)
  })
})
```

---

## Lint config (optional)

> If you want ESLint/Prettier, drop these in; otherwise remove the `lint` script.

### `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist']
}
```

### `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": false
}
```

---

## Package README

### `packages/pandas-facade/README.md`

````md
# pandas-facade

Typed wrapper around the legacy [`pandas-js`](https://www.npmjs.com/package/pandas-js) library. It preserves original behavior and adds some typed helpers.

## Install
```bash
pnpm add pandas-facade
# peer immutable may be required by consumers of pandas-js operations
pnpm add immutable
````

## Usage

```ts
import { Series, DataFrame, asTyped, select } from 'pandas-facade'

const s = new Series([1, 2, 3]).add(10)

const df = new DataFrame([{ a: 1, b: 2 }, { a: 3, b: 4 }])
const onlyA = select(df, 'a')
```

## Notes

- The legacy API surface is typed in `pandas-augment.d.ts`. Extend it as you use more methods.
- New utilities are opt-in and live in `new-features.ts`.

```

---

## How this works
- **Runtime** still comes from `pandas-js` (JS). We just re-export it.
- **Types** come from our `.d.ts` file shipping with the facade.
- **New helpers** are pure TS wrappers that don’t mutate the legacy behavior.

## Next steps / optional
- Extend types for the rest of the methods shown in the official docs (pivot, group, pct_change, etc.).
- Add `@types/immutable` if you start using `Immutable` types directly in your code.
- Publish to your registry: `pnpm publish --filter pandas-facade`.

```
