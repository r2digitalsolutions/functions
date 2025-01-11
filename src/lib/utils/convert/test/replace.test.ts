import { describe, test, expect } from 'vitest';
import { fnReplaceTemplate, fnSlug } from '../replace.js';

describe('fnReplaceTemplate', () => {
  test('replaces placeholders in the template string with values from the values object', () => {
    const template = 'Hello {{name}}!';
    const values = { name: 'John' };
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe('Hello John!');
  });

  test('returns the original template string if no placeholders are found', () => {
    const template = 'Hello World!';
    const values = { name: 'John' };
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe(template);
  });

  test('returns the original template string if the values object is empty', () => {
    const template = 'Hello {{name}}!';
    const values = {};
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe(template);
  });

  test('returns the original template string if the values object does not contain any keys that match the placeholders in the template string', () => {
    const template = 'Hello {{name}}!';
    const values = { age: 25 };
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe(template);
  });

  test('returns the original template string if the values object contains keys that match the placeholders in the template string, but the corresponding values are null or undefined', () => {
    const template = 'Hello {{name}}!';
    const values = { name: null };
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe(template);
  });

  test('returns the original template string if the values object contains keys that match the placeholders in the template string, but the corresponding values are not of the expected type', () => {
    const template = 'Hello {{name}}!';
    const values = { name: 123 };
    const result = fnReplaceTemplate(template, values);
    expect(result).toBe("Hello 123!");
  });
});

describe('fnSlug', () => {
  test('should convert a string to a slug', () => {
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