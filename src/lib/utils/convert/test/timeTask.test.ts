import { describe, test, expect } from 'vitest';
import { fnConvertTimeTaskToObject } from '../timeTask.js';

describe('fnConvertTimeTaskToObject', () => {
  test('should return an empty object when input is empty or undefined', () => {
    expect(fnConvertTimeTaskToObject('')).toEqual({});
    expect(fnConvertTimeTaskToObject(undefined)).toEqual({});
  });

  test('should return an object with seconds property when input has only seconds', () => {
    expect(fnConvertTimeTaskToObject('10s')).toEqual({ s: 10 });
  });

  test('should return an object with minutes property when input has only minutes', () => {
    expect(fnConvertTimeTaskToObject('15m')).toEqual({ m: 15 });
  });

  test('should return an object with hours property when input has only hours', () => {
    expect(fnConvertTimeTaskToObject('2h')).toEqual({ h: 2 });
  });

  test('should return an object with days property when input has only days', () => {
    expect(fnConvertTimeTaskToObject('3d')).toEqual({ d: 3 });
  });

  test('should return an object with all properties when input has a combination of seconds, minutes, hours, and days', () => {
    expect(fnConvertTimeTaskToObject('2d3h4m5s')).toEqual({ d: 2, h: 3, m: 4, s: 5 });
    expect(fnConvertTimeTaskToObject('2d 3h 4m 5s')).toEqual({ d: 2, h: 3, m: 4, s: 5 });
  });

  test('should return an empty object when input has an invalid format', () => {
    expect(fnConvertTimeTaskToObject('10invalid')).toEqual({});
  });
});