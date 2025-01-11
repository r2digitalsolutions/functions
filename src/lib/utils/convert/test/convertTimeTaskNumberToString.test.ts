import { describe, test, expect } from "vitest";
import { fnConvertTimeTaskNumberToString } from "../timeTask.js";

describe('fnConvertTimeTaskNumberToString', () => {
  test('should return an empty string when timeNumber is 0', () => {
    expect(fnConvertTimeTaskNumberToString(0)).toBe('');
  });

  test('should return the correct time task string for 1 minute', () => {
    expect(fnConvertTimeTaskNumberToString(1)).toBe('1m');
  });

  test('should return the correct time task string for 60 minutes', () => {
    expect(fnConvertTimeTaskNumberToString(60)).toBe('1h');
  });

  test('should return the correct time task string for 1440 minutes', () => {
    expect(fnConvertTimeTaskNumberToString(1440)).toBe('1d');
  });

  test('should return the correct time task string for 10080 minutes', () => {
    expect(fnConvertTimeTaskNumberToString(10080)).toBe('1w');
  });

  test('should return the correct time task string for a combination of values', () => {
    expect(fnConvertTimeTaskNumberToString((1 * 7 * 24 * 60) + (3 * 24 * 60) + (2 * 60) + 4)).toBe('1w 3d 2h 4m');
  });
});