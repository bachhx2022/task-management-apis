export function toBool<T>({ value }: { value?: string | boolean }) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value === 'true';
  }
  throw new Error(`toBool: Invalid value ${value}`);
}
