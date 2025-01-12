import { describe, expect, test } from "vitest";
import { fnFormatDateTime, fnFormatDateTimeToSelect, fnMonthsForLocale, secondsToTime } from "./format.js";

describe("Format", () => {
  test('format should work', async () => {
    expect(fnFormatDateTime(new Date('2022-01-01T10:00:00'))).toBe('1 Jan 2022, 10:00');
  })

  test('format should work', async () => {
    expect(fnFormatDateTimeToSelect(new Date('2022-01-01T10:05:00'))).toBe('2022-01-01T10:05');
  })
})


describe('fnMonthsForLocale', () => {
  test('should return an array of months in long format for en-US locale', () => {
    expect(fnMonthsForLocale('en-US', 'long')).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });

  test('should return an array of months in short format for en-US locale', () => {
    expect(fnMonthsForLocale('en-US', 'short')).toEqual([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]);
  });

  test('should return an array of months in long format for fr-FR locale', () => {
    expect(fnMonthsForLocale('fr-FR', 'long')).toEqual([
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ]);
  });

  test('should return the correct time for a given number of seconds', () => {
    expect(secondsToTime(0)).toBe('00:00');
    expect(secondsToTime(10)).toBe('00:10');
    expect(secondsToTime(60)).toBe('01:00');
    expect(secondsToTime(180)).toBe('03:00');
    expect(secondsToTime(3600)).toBe('60:00');
  });
});