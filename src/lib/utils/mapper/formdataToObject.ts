function parseKey(key: string): (string | number)[] {
  const parts: (string | number)[] = [];
  const regex = /([^[.\]]+)|\[(\d+|[^[\]]+)\]/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(key))) {
    const part = match[1] ?? match[2];
    const parsed = /^\d+$/.test(part) ? Number(part) : part;
    parts.push(parsed);
  }

  return parts;
}

function setDeep(obj: Record<string, unknown>, path: (string | number)[], value: unknown): void {
  let current = obj;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    const nextKey = path[i + 1];

    if (i === path.length - 1) {
      current[key] = value;
    } else {
      if (!(key in current)) {
        current[key] = typeof nextKey === 'number' ? [] : {};
      }
      current = current[key] as Record<string, unknown>;
    }
  }
}

function parseFormDataObject(formDataObject: Record<string, string>) {
  const result: Record<string, unknown> = {};

  for (const fullKey in formDataObject) {
    const value = formDataObject[fullKey];
    const path = parseKey(fullKey);
    setDeep(result, path, value);
  }

  return result;
}

/**
 * Transforma un objeto de formulario en un objeto JavaScript
 * @param data FormData
 * @returns Objeto JavaScript
 * @example
 * const formData = new FormData();
 * formData.append("name", "John");
 * formData.append("age", "30");
 * formData.append("address.street", "123 Main St");
 * formData.append("address.city", "New York");
 * formData.append("address.state", "NY");
 * formData.append("address.zip", "10001");
 * formData.append("phones[0].type", "mobile");
 * formData.append("phones[0].number", "123456789");
 * formData.append("phones[1].type", "home");
 * formData.append("phones[1].number", "987654321");
 *
 * const result = formdataToObject(formData);
 * console.log(result);
 * // { name: "John", age: "30", address: { street: "123 Main St", city: "New York", state: "NY", zip: "10001" }, phones: [ { type: "mobile", number: "123456789" }, { type: "home", number: "987654321" } ] }
 */
export function formdataToObject<T extends Record<string, unknown> = any>(data: FormData): T {
  const body = Object.fromEntries(data.entries()) as Record<string, string>;
  const parsed = parseFormDataObject(body as Record<string, string>);
  return parsed as T;
}
