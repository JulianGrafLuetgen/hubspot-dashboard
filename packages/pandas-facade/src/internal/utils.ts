export function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

export type Keys<T> = Extract<keyof T, string>


