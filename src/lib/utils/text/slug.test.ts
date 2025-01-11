import { describe, test, expect } from 'vitest';
import { fnSlug } from './slug.js';

describe('fnSlug', () => {
  test('should transform a string into a slug', () => {
    const input = 'Hello World!';
    const expected = 'hello-world';
    expect(fnSlug(input)).toBe(expected);
  });

  test('should replace non-alphanumeric characters with hyphens', () => {
    const input = 'Hello World!?';
    const expected = 'hello-world';
    expect(fnSlug(input)).toBe(expected);
  });

  test('should remove leading and trailing hyphens', () => {
    const input = '   Hello World!   ';
    const expected = 'hello-world';
    expect(fnSlug(input)).toBe(expected);
  });

  test('should remove accents and diacritics', () => {
    const input = 'Héllo Wörld!';
    const expected = 'hello-world';
    expect(fnSlug(input)).toBe(expected);
  });

  test('should handle empty strings', () => {
    const input = '';
    const expected = '';
    expect(fnSlug(input)).toBe(expected);
  });
});