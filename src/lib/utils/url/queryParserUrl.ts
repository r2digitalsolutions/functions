import pkg from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = pkg;

import type { QueryStructure } from '../query/QueryParser.ts';

export function toQueryParam(query: QueryStructure): string {
  const json = JSON.stringify(query);
  return compressToEncodedURIComponent(json);
}

export function fromQueryParam(param: string): QueryStructure | null {
  const decompressed = decompressFromEncodedURIComponent(param);
  if (!decompressed) {
    console.error('Error decoding query param');
    return null;
  }

  try {
    const parsed: QueryStructure = JSON.parse(decompressed);
    return parsed;
  } catch (error) {
    console.error('Error parsing query JSON', error);
    return null;
  }
}