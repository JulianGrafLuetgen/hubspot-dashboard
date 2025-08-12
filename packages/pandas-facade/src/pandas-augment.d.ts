// Ambient module typing for the runtime package we wrap
// Reference: https://stratodem.github.io/pandas.js-docs/

declare module 'pandas-js' {
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
    // facade-added convenience
    toArray(): T[]
  }

  export type Row = Record<string, any>

  export class DataFrame<T extends Row = Row> {
    constructor(rows: T[])

    // properties
    index: (string | number)[]
    columns(): string[]
    length: number

    // basic IO
    to_json(): string
    toString(): string
    values(): T[]

    // selection & iteration
    get(col: keyof T & string): Series<T[keyof T]>
    set<K extends string & keyof any>(col: K, series: Series<any> | any[]): DataFrame<T & Record<K, any>>
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
    iloc(i: number): T

    // facade-added helpers (instance)
    asTyped<U extends Row>(): DataFrame<U>
    select<K extends keyof T & string>(...cols: K[]): DataFrame<Pick<T, K>>
    groupBy<K extends keyof T & string>(...cols: K[]): Map<string, DataFrame<T>>
  }

  // facade-added helpers (static)
  export namespace DataFrame {
    function fromRecords<U extends Row>(rows: U[]): DataFrame<U>
  }
}


