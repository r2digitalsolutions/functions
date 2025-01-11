import { beforeEach, describe, expect, test } from "vitest";
import { CookieManager } from "./cookie.js";

describe("CookieManager", () => {
  beforeEach(() => {
    // Limpiar cookies antes de cada prueba
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  });

  test("debe establecer una cookie", () => {
    CookieManager.setCookie("testCookie", "testValue", 7);
    expect(document.cookie).toContain("testCookie=testValue");
  });

  test("debe obtener una cookie existente", () => {
    document.cookie = "testCookie=testValue";
    const value = CookieManager.getCookie("testCookie");
    expect(value).toBe("testValue");
  });

  test("debe retornar null para una cookie inexistente", () => {
    const value = CookieManager.getCookie("nonExistentCookie");
    expect(value).toBeNull();
  });

  test("debe eliminar una cookie", () => {
    document.cookie = "testCookie=testValue";
    CookieManager.deleteCookie("testCookie");
    const value = CookieManager.getCookie("testCookie");
    expect(value).toBeNull();
  });

  test("debería lanzar un error al establecer una cookie con un nombre inválido", () => {
    expect(() => CookieManager.setCookie("test cookie", "value")).toThrow(
      "El nombre de la cookie no puede contener espacios, punto y coma, o el signo igual."
    );
  });
});
