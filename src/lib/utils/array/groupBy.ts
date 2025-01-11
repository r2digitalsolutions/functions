/**
 * Groups the elements of an array based on the result of the given function.
 * @param arr The array to group.
 * @param callback Function that maps an array element to a key.
 * @returns An object with the group keys as properties, and arrays of elements that
 *          mapped to that key as the value.
 */
export const fnGroupBy = <T, K extends string | number | symbol>(
  arr: readonly T[],
  callback: (value: T, index: number, array: readonly T[]) => K
): Record<K, readonly T[]> => arr.reduce((groups, item, index, array) => {
  const key = callback(item, index, array);
  if (!Object.prototype.hasOwnProperty.call(groups, key)) {
    groups[key] = [];
  }
  (groups[key] as T[]).push(item);
  return groups;
}, {} as Record<K, readonly T[]>);