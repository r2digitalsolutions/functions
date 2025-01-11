export class CookieManager {
  /**
   * Establece una cookie.
   * @param name Nombre de la cookie.
   * @param value Valor de la cookie.
   * @param days Número de días hasta que la cookie expire.
   */
  static setCookie(name: string, value: string, days: number = 7): void {
    if (!name || /[\s;=]/.test(name)) {
      throw new Error("El nombre de la cookie no puede contener espacios, punto y coma, o el signo igual.");
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  /**
   * Obtiene el valor de una cookie.
   * @param name Nombre de la cookie.
   * @returns Valor de la cookie, o null si no existe.
   */
  static getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  /**
   * Elimina una cookie.
   * @param name Nombre de la cookie.
   */
  static deleteCookie(name: string): void {
    CookieManager.setCookie(name, "", -1);
  }
}
