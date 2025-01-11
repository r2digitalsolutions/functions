import { describe, expect, test, vi } from "vitest";
import { fnDateToAgo, fnDateToMinutes } from "./timeAgo.js";

describe("fnDateToAgo", () => {
  test('timeAgo should work', async () => {
    vi.setSystemTime(new Date('2022-01-01T10:00:00'));
    expect(fnDateToAgo(new Date('2022-01-01T09:59:50'))).toBe('just now');
    expect(fnDateToAgo(new Date('2022-01-01T09:59:51'))).toBe('just now');
    expect(fnDateToAgo(new Date('2022-01-01T09:58:00'))).toBe('2 minutes ago');
    expect(fnDateToAgo(new Date('2022-01-01T09:00:00'))).toBe('1 hour ago');
    expect(fnDateToAgo(new Date('2022-01-01T08:00:00'))).toBe('2 hours ago');
    expect(fnDateToAgo(new Date('2021-12-31T10:00:00'))).toBe('1 day ago');
    expect(fnDateToAgo(new Date('2021-12-30T10:00:00'))).toBe('2 days ago');
    expect(fnDateToAgo(new Date('2021-12-20T10:00:00'))).toBe('1 week ago');
    expect(fnDateToAgo(new Date('2021-12-12T10:00:00'))).toBe('2 weeks ago');
    expect(fnDateToAgo(new Date('2021-12-01T10:00:00'))).toBe('1 month ago');
    expect(fnDateToAgo(new Date('2021-11-01T10:00:00'))).toBe('2 months ago');
    expect(fnDateToAgo(new Date('2021-01-01T10:00:00'))).toBe('1 year ago');
    expect(fnDateToAgo(new Date('2020-01-01T10:00:00'))).toBe('2 years ago');
  });
});

describe("fnDateToMinutes", () => {
  test('date to minutes should work', async () => {
    vi.setSystemTime(new Date('2022-01-01T10:00:00'));
    expect(fnDateToMinutes(new Date('2022-01-01T09:59:50'))).toBe(0);
  });

  test('timeAgo should work', async () => {
    vi.setSystemTime(new Date('2022-01-01T10:00:00'));
    expect(fnDateToMinutes(new Date('2022-01-01T09:59:00'))).toBe(1);
  });
});

