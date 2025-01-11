/**
 * Capitalizes the first letter of a string.
 *
 * @param str The string to capitalize. If falsy, an empty string is returned.
 * @returns A new string with the first letter capitalized. If `str` was falsy, an empty string is returned.
 */
export const fnCapitalizeFirstLetter = (str: string | null | undefined): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
