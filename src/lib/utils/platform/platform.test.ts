import { describe, expect, it, vi } from "vitest";
import { platform as platformModule } from "./platform.js";

describe("platform", () => {
  it("isMac", () => {
    vi.stubGlobal("navigator", { userAgent: "Macintosh" });

    expect(platformModule.isMac()).toBe(true);

    vi.restoreAllMocks(); // Restaurar el valor original de navigator
  });
  it("isWindows", () => {
    vi.stubGlobal("navigator", { userAgent: "Windows" });

    expect(platformModule.isWindows()).toBe(true);

    vi.restoreAllMocks(); // Restaurar el valor original de navigator
  });
  it("isLinux", () => {
    vi.stubGlobal("navigator", { userAgent: "Linux" });

    expect(platformModule.isLinux()).toBe(true);

    vi.restoreAllMocks(); // Restaurar el valor original de navigator
  });
  it("window undefined", () => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("navigator", { userAgent: "Linux" });

    expect(platformModule.isLinux()).toBe(false);

    vi.restoreAllMocks(); // Restaurar el valor original de navigator
  });
});
