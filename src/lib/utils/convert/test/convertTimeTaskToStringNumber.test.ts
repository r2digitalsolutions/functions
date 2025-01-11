import { describe, test, expect } from 'vitest';
import { fnConvertTimeTaskToStringNumber } from '../timeTask.js';

describe('fnConvertTimeTaskToStringNumber', () => {
  test('should return 0 when timeTaskString is an empty string', () => {
    expect(fnConvertTimeTaskToStringNumber('')).toBe(0);
  });

  test('should return the correct number of minutes for a time task string with only seconds', () => {
    expect(fnConvertTimeTaskToStringNumber('10s')).toBe(0);
  });

  test('should return the correct number of minutes for a time task string with only minutes', () => {
    expect(fnConvertTimeTaskToStringNumber('15m')).toBe(15);
  });

  test('should return the correct number of minutes for a time task string with only hours', () => {
    expect(fnConvertTimeTaskToStringNumber('2h')).toBe(2 * 60);
  });

  test('should return the correct number of minutes for a time task string with only days', () => {
    expect(fnConvertTimeTaskToStringNumber('3d')).toBe(3 * 24 * 60);
  });

  test('should return the correct number of minutes for a time task string with only weeks', () => {
    expect(fnConvertTimeTaskToStringNumber('2w')).toBe(2 * 7 * 24 * 60);
  });

  test('should return the correct number of minutes for a time task string with a combination of seconds, minutes, hours, and days', () => {
    expect(fnConvertTimeTaskToStringNumber('2d3h4m5s')).toBe(2 * 24 * 60 + 3 * 60 + 4);
  });

  test('should return 0 when timeTaskString has an invalid format', () => {
    expect(fnConvertTimeTaskToStringNumber('10invalid')).toBe(0);
  });
});