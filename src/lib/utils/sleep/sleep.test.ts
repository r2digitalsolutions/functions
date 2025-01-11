import { describe, expect, test } from "vitest";
import { fnSleep } from "./sleep.js";

describe("fnSleep", () => {
  test('sleep should work', async () => {
    expect(await fnSleep()).toBe(undefined);
  })
})