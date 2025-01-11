/**
 * Transforms a string into a slug.
 *
 * @param text The string to transform.
 *
 * @returns The transformed string.
 */
export const fnSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[áéíóúñ]/g, (char) => char.normalize('NFD').charAt(0))
    .replace(/[äöüß]/g, (char) => char.normalize('NFD').charAt(0))
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
};