import { describe, test, expect } from 'vitest';
import { fnValidateTaskTime } from './time.js';

describe('fnValidateTaskTime', () => {
  test('valid time strings should return true', () => {
    expect(fnValidateTaskTime("1d 8m")).toBe(true);
    expect(fnValidateTaskTime("2d 4h 20m")).toBe(true);
    expect(fnValidateTaskTime("1h 10m")).toBe(true);
    expect(fnValidateTaskTime("1s 5d 3h 11m")).toBe(true);
    expect(fnValidateTaskTime("20m")).toBe(true);
  });

  test('invalid time strings with repeated units should return false', () => {
    expect(fnValidateTaskTime("1d 1d")).toBe(false);
    expect(fnValidateTaskTime("2h 5h")).toBe(false);
    expect(fnValidateTaskTime("10m 10m")).toBe(false);
    expect(fnValidateTaskTime("1s 1s")).toBe(false);
  });
});