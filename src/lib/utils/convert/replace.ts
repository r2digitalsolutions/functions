/**
 * Replace placeholders in a template string with values from an object.
 * @param template The template string with placeholders like `{{key}}`
 * @param values Object with string keys and any value type
 * @param fn Function that transforms the value for each placeholder. By default it returns the value as is.
 * @returns A new string with the placeholders replaced
 */
export function fnReplaceTemplate<T extends Record<string, any>>(
  template: string,
  values: T,
  fn: (value: T[keyof T]) => any = (v) => v
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(values, key)
      ? values[key] === null ? match : fn(values[key])
      : match
  })
}

export const fnSlug = (input: string): string => {
  // Convertir a minúsculas
  let slug = input.toLowerCase();

  // Reemplazar caracteres especiales
  slug = slug
    .replace(/á|à|ä|â/g, 'a')
    .replace(/é|è|ë|ê/g, 'e')
    .replace(/í|ì|ï|î/g, 'i')
    .replace(/ó|ò|ö|ô/g, 'o')
    .replace(/ú|ù|ü|û/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ç/g, 'c');

  // Eliminar caracteres no deseados
  slug = slug.replace(/[^a-z0-9\s-]/g, '');

  // Reemplazar espacios y guiones por un único guión
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-');

  // Eliminar guiones al principio y al final
  slug = slug.replace(/^-|-$/g, '');

  return slug;
}