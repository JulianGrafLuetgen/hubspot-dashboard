/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'pandas-js' {
    /** Basic dtype helper */
    export class DType {
      constructor(name: 'int' | 'float' | 'bool' | 'datetime' | 'object' | string);
      toString(): string;
      readonly dtype: string;
    }
  
    /** Shared base */
    export class NDFrame {
      /** Internal data holder (implementation detail) */
      protected _data: any;
      /** Lazy cache of values (implementation detail) */
      protected _values: any;
  
      /** Axes labels shape, e.g. (rows, cols) for DataFrame */
      readonly shape: any;
      /** Raw values; Series -> List<any>, DataFrame -> List<List<any>> */
      get values(): any;
    }
  
    export interface SeriesKwargs {
      name?: string;
      index?: any[] | any;
    }
  
    export class Series extends NDFrame implements Iterable<any> {
      constructor(data: any[] | any /* List<any> */ | any, kwargs?: SeriesKwargs);
  
      // metadata
      readonly name: string;
      get index(): any; set index(v: any);
      readonly length: number;
      get dtype(): DType;
      get kwargs(): { name?: string; index?: any };
  
      // iteration
      [Symbol.iterator](): Iterator<any>;
      forEach(func: (val: any, idx: number) => void): void;
      map<U = any>(func: (val: any, idx: number) => U): Series;
  
      // selection
      /** iloc(i) -> value; iloc(start, end) -> Series slice */
      iloc(i: number): any;
      iloc(start: number, end: number): Series;
  
      head(n?: number): Series;
      tail(n?: number): Series;
      copy(): Series;
  
      // conversion / dtype
      astype(nextType: DType): Series;
      toString(): string;
  
      // math & stats
      sum(): number;
      mean(): number;
      median(): number;
      variance(): number;
      std(): number;
      abs(): Series;
  
      add(other: number | Series | any[] | any /* List<any> */): Series;
      sub(other: number | Series | any[] | any): Series;
      mul(other: number | Series | any[] | any): Series;
      multiply(other: number | Series | any[] | any): Series;
      div(other: number | Series | any[] | any): Series;
      divide(other: number | Series | any[] | any): Series;
  
      cov(other: Series): number;
      corr(other: Series): number;
  
      diff(periods?: number): Series;
      pct_change(periods?: number): Series;
      shift(periods?: number): Series;
  
      // comparisons & filtering
      where(
        other: any | Series | any[] | any /* List<any> */,
        op: (a: any, b: any) => any
      ): Series;
      eq(other: any | Series | any[] | any): Series;
      lt(other: any | Series | any[] | any): Series;
      lte(other: any | Series | any[] | any): Series;
      gt(other: any | Series | any[] | any): Series;
      gte(other: any | Series | any[] | any): Series;
      notnull(): Series;
      unique(): any /* List<any> */;
  
      filter(iterBool: Series | any[] | any /* List<any> */): Series;
  
      // cumulative ops
      cumsum(): Series;
      cummul(): Series;
      cummax(): Series;
      cummin(): Series;
    }
  
    export interface DataFrameKwargs {
      index?: any[] | any;
      columns?: any[] | any;
    }
  
    export type DataFrameInit =
      | { [column: string]: Series | any[] }                // object of columns
      | Array<Record<string, any>>                          // array of row objects
      | any /* Map<string, Series> | OrderedMap<string, Series> */
      | any;  // permissive: the lib builds Series internally
  
    export type MergeHow = 'inner' | 'outer';
  
    export class DataFrame extends NDFrame {
      constructor(data: DataFrameInit, kwargs?: DataFrameKwargs);
  
      // metadata
      get index(): any; set index(v: any);
      get columns(): any; set columns(v: any);
      readonly length: number;
      get kwargs(): { index?: any; columns?: any };
  
      // iteration
      /** Returns an iterator of [row, index] where row is a Map-like of column->value */
      iterrows(): IterableIterator<[any /* row map */, number]>;
  
      // column ops
      columnExists(col: string | number): boolean;
      /** Get a column (Series) or a subset DataFrame when passing multiple columns */
      get(columns: string | number): Series;
      get(columns: (string | number)[] | any /* List/Seq */): DataFrame;
      /** Set/replace a column */
      set(column: string | number, series: Series | any[] | any): DataFrame;
      /** Rename columns */
      rename(args: { columns: any /* Map<prev,next> */ }): DataFrame;
  
      // index ops
      reset_index(args?: { drop?: boolean }): DataFrame;
  
      // selection
      /** iloc(rowIndex) -> 1-row DataFrame; iloc([r0,r1], [c0,c1]) -> sliced DataFrame */
      iloc(rowIdx: number, colIdx?: number): DataFrame;
      iloc(rowIdx: [number, number], colIdx?: [number, number] | number): DataFrame;
      head(n?: number): DataFrame;
      tail(n?: number): DataFrame;
      transpose(): DataFrame;
  
      // binary ops / comparisons
      where(
        other:
          | any
          | Series
          | any[] 
          | any /* List<any> */
          | DataFrame,
        op: (a: any, b: any) => any
      ): DataFrame;
      eq(other: any | Series | any[] | any | DataFrame): DataFrame;
      lt(other: any | Series | any[] | any | DataFrame): DataFrame;
      lte(other: any | Series | any[] | any | DataFrame): DataFrame;
      gt(other: any | Series | any[] | any | DataFrame): DataFrame;
      gte(other: any | Series | any[] | any | DataFrame): DataFrame;
  
      filter(iterBool: Series | any[] | any /* List<any> */): DataFrame;
  
      // joins / concat
      merge(df: DataFrame, on?: (string | number)[] | any /* List<any> */, how?: MergeHow): DataFrame;
      append(other: DataFrame, ignore_index?: boolean): DataFrame;
  
      // export
      to_csv(): string;
      to_json<T = unknown>(opts?: { orient?: 'records' | 'split' | 'index' | 'values' | 'columns' }): T;
      toJSON<T = unknown>(): T;
  
      // minimal group/agg/sort API used in our app
      groupBy(column: string): DataFrame;
      sum(column: string): DataFrame;
      sortValues(column: string, options?: { ascending?: boolean; stable?: boolean }): DataFrame;

      // reductions (axis: 0 = column-wise, 1 = row-wise)
      sum(axis?: 0 | 1): Series;
      mean(axis?: 0 | 1): Series;
      std(axis?: 0 | 1): Series;
      variance(axis?: 0 | 1): Series;
  
      // cumulative (axis: 0 or 1)
      cumsum(axis?: 0 | 1): DataFrame;
      cummul(axis?: 0 | 1): DataFrame;
      cummax(axis?: 0 | 1): DataFrame;
      cummin(axis?: 0 | 1): DataFrame;
    }
  
    // module-level functions
    export function concat<T extends Series | DataFrame>(
      objs: T[] | any /* List<T> */,
      kwargs?: { ignore_index?: boolean; axis?: 0 | 1 }
    ): T;
  
    /** Converts string(s) to Date. Keeps shape (Series/DataFrame/array). */
    export function to_datetime(
      arg: Series | DataFrame | any[] | any /* List<any> */ | string
    ): Series | DataFrame | any /* List<Date> */ | Date;
  
    // Support both interop styles:
    const _default: {
      Series: typeof Series;
      DataFrame: typeof DataFrame;
      concat: typeof concat;
      to_datetime: typeof to_datetime;
    };
    export default _default;
  }
  