import { describe, expect, test } from "vitest";
import { fnHumanize } from "../humanize.js";

describe('Humanize', () => {
  test('humanize -1 should work', async () => {
    expect(fnHumanize(-1)).toBe("-1");
  })

  test('humanize one should work', async () => {
    expect(fnHumanize(1)).toBe("1");
  })

  test('humanize zero should work', async () => {
    expect(fnHumanize(0)).toBe("0");
  })

  test('humanize 1024 should work', async () => {
    expect(fnHumanize(1024)).toBe("1.02k");
  })

  test('humanize 1.05 should work', async () => {
    expect(fnHumanize(1024 * 1024)).toBe("1.05M");
  })

  test('humanize 1.07 should work', async () => {
    expect(fnHumanize(1024 * 1024 * 1024)).toBe("1.07B");
  })

  test('humanize 1.09 should work', async () => {
    expect(fnHumanize(1024 * 1024 * 1024 * 1024)).toBe("1.10T");
  })

  test('humanize 1.11 should work', async () => {
    expect(fnHumanize(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.13Qa");
  })
})