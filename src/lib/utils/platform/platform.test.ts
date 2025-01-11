import { describe, expect, it, vi } from "vitest";
import { platform as platformModule } from "./platform.js";

describe("platform", () => {
  it("isMac", () => {
    vi.stubGlobal("navigator", { userAgent: "Macintosh" });

    expect(platformModule.isMac()).toBe(true);

    vi.restoreAllMocks(); // Restaurar el valor original de navigator
  });
});
