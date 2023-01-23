import { Maybe } from '../@types'

export function defaultsTo<T, S>(
  value: Maybe<T> | undefined,
  defaultValue: S
): T | S {
  return value === null || value === undefined ? defaultValue : value
}

export function isNull(x: unknown): x is null {
  return x === null
}

export function isNotNull<T>(x: T | null): x is T {
  return x !== null
}

export function isUndefined<T>(x: T | undefined): x is undefined {
  return x === undefined
}

export function isNotUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}

export function isNotEmpty(value: ArrayLike<unknown>): boolean {
  return value.length > 0
}

export function isEmpty(value: ArrayLike<unknown>): boolean {
  return value.length === 0
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isObject(x: unknown): x is object {
  return typeof x === 'object' && isNotNull(x)
}

export function joinClassNames(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}
