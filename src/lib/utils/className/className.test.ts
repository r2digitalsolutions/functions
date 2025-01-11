import { describe, it, expect } from 'vitest';
import { fnClassNames } from './className.js';

describe('fnClassNames function', () => {
  it('should concatenate string classes', () => {
    const result = fnClassNames('button', 'primary');
    expect(result).toBe('button primary');
  });

  it('should include conditional classes', () => {
    const result1 = fnClassNames('button', { 'active': true });
    expect(result1).toBe('button active');

    const result2 = fnClassNames('button', { 'active': false });
    expect(result2).toBe('button');
  });

  it('should ignore falsy values', () => {
    const result = fnClassNames('button', null, undefined, '');
    expect(result).toBe('button');
  });

  it('should include custom class names', () => {
    const result = fnClassNames('button', 'primary', 'custom');
    expect(result).toBe('button primary custom');
  });

  it('should handle complex combinations', () => {
    const isActive = true;
    const additionalClasses = {
      'active': isActive,
      'inactive': !isActive
    };
    const customClassName = 'custom';
    const result = fnClassNames('button', additionalClasses, customClassName);
    expect(result).toBe('button active custom');
  });
});
