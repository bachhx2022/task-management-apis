export function toArray<T>({ value }: { value: T }): T[] | null {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : null;
}
