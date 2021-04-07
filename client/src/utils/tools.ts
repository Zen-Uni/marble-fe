export const isDef = <T>(v: T | undefined | null): v is T =>
  v !== undefined && v !== null;
export const isUndef = (v: any): v is undefined | null =>
  v === undefined || v === null;
