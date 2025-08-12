import { DataFrame, Series } from 'pandas-js'

// Minimal internal shapes to work with pandas-js at runtime
type DataFrameInternal = DataFrame & {
  get(name: string): Series
  length: number
  columns?: unknown | { toArray?: () => unknown[] }
}

type DataFrameCtor = new (data?: unknown) => DataFrame
const DataFrameAny = DataFrame as unknown as DataFrameCtor

export type Agg = 'sum' | 'mean' | 'count'
export type AggSpec = Record<string, Agg>

// Keep generic compatibility with index.ts import
export type KeySelector<T = Record<string, unknown>> = string | string[]

function ensureArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val]
}

function buildBuckets(df: DataFrame, keys: string[]): Map<string, number[]> {
  const buckets = new Map<string, number[]>()
  const length = (df as unknown as DataFrameInternal).length
  for (let i = 0; i < length; i++) {
    const key = keys
      .map((k) => String(((df as unknown as DataFrameInternal).get(k) as Series).iloc(i)))
      .join('¦')
    const arr = buckets.get(key)
    if (arr) arr.push(i)
    else buckets.set(key, [i])
  }
  return buckets
}

function materializeGrouped(
  df: DataFrame,
  keys: string[],
  buckets: Map<string, number[]>,
  agg: AggSpec,
): DataFrame {
  const outRows: Array<Record<string, unknown>> = []
  for (const [keyStr, idxs] of buckets) {
    const row: Record<string, unknown> = {}
    const parts = keyStr.split('¦')
    keys.forEach((k, i) => {
      row[k] = parts[i]
    })
    for (const [col, op] of Object.entries(agg)) {
      const s = new Series(idxs.map((i) => ((df as unknown as DataFrameInternal).get(col) as Series).iloc(i)))
      row[col] = op === 'sum' ? s.sum() : op === 'mean' ? s.mean() : idxs.length
    }
    outRows.push(row)
  }
  return new DataFrameAny(outRows)
}

export class GroupedDataFrame {
  private readonly df: DataFrame
  private readonly keys: string[]
  private readonly buckets: Map<string, number[]>

  constructor(df: DataFrame, by: string | string[]) {
    this.df = df
    this.keys = ensureArray(by)
    this.buckets = buildBuckets(df, this.keys)
  }

  sum(cols: string | string[]): DataFrame {
    const agg: AggSpec = {}
    for (const c of ensureArray(cols)) agg[c] = 'sum'
    return materializeGrouped(this.df, this.keys, this.buckets, agg)
  }

  mean(cols: string | string[]): DataFrame {
    const agg: AggSpec = {}
    for (const c of ensureArray(cols)) agg[c] = 'mean'
    return materializeGrouped(this.df, this.keys, this.buckets, agg)
  }

  count(colName = 'count'): DataFrame {
    return materializeGrouped(this.df, this.keys, this.buckets, { [colName]: 'count' })
  }

  agg(spec: AggSpec): DataFrame {
    return materializeGrouped(this.df, this.keys, this.buckets, spec)
  }
}

export function sortValues(df: DataFrame, column: string, opts?: { ascending?: boolean }): DataFrame {
  const ascending = opts?.ascending !== false
  // derive columns array as best-effort
  const columnsRaw = (df as unknown as DataFrameInternal).columns
  const columns: string[] = Array.isArray(columnsRaw)
    ? (columnsRaw as string[])
    : (typeof (columnsRaw as any)?.toArray === 'function'
      ? ((columnsRaw as any).toArray().map(String))
      : [])

  const length = (df as unknown as DataFrameInternal).length
  const indices = Array.from({ length }, (_, i) => i)
  const series = ((df as unknown as DataFrameInternal).get(column)) as Series
  indices.sort((a, b) => {
    const va = series.iloc(a) as unknown as number | string
    const vb = series.iloc(b) as unknown as number | string
    if (va === vb) return 0
    return (va < vb ? -1 : 1) * (ascending ? 1 : -1)
  })

  const outRows: Array<Record<string, unknown>> = []
  for (const i of indices) {
    const row: Record<string, unknown> = {}
    for (const col of columns) {
      row[col] = (((df as unknown as DataFrameInternal).get(col)) as Series).iloc(i)
    }
    // ensure sorted column present even if not listed in columns
    if (!(column in row)) row[column] = series.iloc(i)
    outRows.push(row)
  }
  return new DataFrameAny(outRows)
}

export function groupBy(df: DataFrame, by: KeySelector): GroupedDataFrame {
  return new GroupedDataFrame(df, ensureArray(by))
}

export function installPandasJsHelpers(): void {
  const dfCtor = DataFrame as unknown as {
    prototype: {
      groupBy?: (by: string | string[]) => GroupedDataFrame
      sortValues?: (column: string, opts?: { ascending?: boolean }) => DataFrame
    }
  }
  if (!dfCtor.prototype.groupBy) {
    dfCtor.prototype.groupBy = function (this: DataFrame, by: string | string[]) {
      return new GroupedDataFrame(this, by)
    }
  }
  if (!dfCtor.prototype.sortValues) {
    dfCtor.prototype.sortValues = function (this: DataFrame, column: string, opts?: { ascending?: boolean }) {
      return sortValues(this, column, opts)
    }
  }
}
