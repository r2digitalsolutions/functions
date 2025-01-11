import { describe, expect, test } from "vitest";
import { fnRandom } from "./random.js";

describe('Random', () => {
  test('random should work', async () => {
    expect(fnRandom(0, 100)).toBeGreaterThanOrEqual(0);
    expect(fnRandom(0, 100)).toBeLessThanOrEqual(100);
  })
})