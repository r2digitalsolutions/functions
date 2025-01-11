import { describe, expect, test } from "vitest";
import { fnConvertFileSize } from "../convert.js";

describe("convert", () => {
  test('convert should work', async () => {
    expect(fnConvertFileSize(0)).toBe('n/a');
    expect(fnConvertFileSize(1)).toBe('1 Bytes');
    expect(fnConvertFileSize(1024)).toBe('1.0 KB');
    expect(fnConvertFileSize(1024 * 1024)).toBe('1.0 MB');
    expect(fnConvertFileSize(1024 * 1024 * 1024)).toBe('1.0 GB');
    expect(fnConvertFileSize(1024 * 1024 * 1024 * 1024)).toBe('1.0 TB');
    expect(fnConvertFileSize(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1.0 PB');
  })
})