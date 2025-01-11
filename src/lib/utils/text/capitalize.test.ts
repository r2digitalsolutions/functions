import { describe, test, expect } from 'vitest';
import { fnCapitalizeFirstLetter } from './capitalize';

describe('fnCapitalizeFirstLetter', () => {
  test('should capitalize the first letter of a string', () => {
    expect(fnCapitalizeFirstLetter('hello')).toBe('Hello');
    expect(fnCapitalizeFirstLetter('world')).toBe('World');
    expect(fnCapitalizeFirstLetter('HELLO')).toBe('HELLO');
  });

  test('should return an empty string for an empty string', () => {
    expect(fnCapitalizeFirstLetter('')).toBe('');
  });

  test('should return an empty string for null or undefined', () => {
    expect(fnCapitalizeFirstLetter(null)).toBe('');
    expect(fnCapitalizeFirstLetter(undefined)).toBe('');
  });
});