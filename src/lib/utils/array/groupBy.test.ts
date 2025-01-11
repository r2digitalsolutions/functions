import { describe, expect, test } from "vitest";
import { fnGroupBy } from "./groupBy.js";

describe("fnGroupBy", () => {
  test('groupBy should work', async () => {
    const arr = [
      { id: 1, name: 'John', category: "a" },
      { id: 2, name: 'Jane', category: "b" },
      { id: 3, name: 'Joe', category: "a" },
    ];

    const result = fnGroupBy(arr, (item) => item.category);

    expect(result).toEqual({
      a: [{ id: 1, name: 'John', category: "a" }, { id: 3, name: 'Joe', category: "a" }],
      b: [{ id: 2, name: 'Jane', category: "b" }],
    });
  })
})