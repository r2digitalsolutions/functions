import { describe, expect, it } from 'vitest';
import { QueryParser, type QueryStructure } from './QueryParser.js';

describe('QueryParser', () => {
  it('should parse a query string with equals, contains, and greater_than operators', () => {
    const queryString = 'code="1235" and name:"juan 21" and code>100';
    const parser = new QueryParser(queryString);
    const expected: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['code', 'equals', '1235'],
        ['name', 'contains', 'juan 21'],
        ['code', 'greater_than', 100]
      ]
    };
    const parsedQuery = parser.parse();
    expect(parsedQuery).toEqual(expected);
  });

  it('should parse a query string with equals, contains, and less_than operators', () => {
    const queryString = 'code="1235" or name:"juan 21" or code<100';
    const parser = new QueryParser(queryString);
    const expected: QueryStructure = {
      useQuery: true,
      joinOperation: 'OR',
      filters: [
        ['code', 'equals', '1235'],
        ['name', 'contains', 'juan 21'],
        ['code', 'less_than', 100]
      ]
    };
    const parsedQuery = parser.parse();
    expect(parsedQuery).toEqual(expected);
  });

  it('should parse a query string with less_than operator', () => {
    const queryString = 'code<100';
    const parser = new QueryParser(queryString);
    const expected: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['code', 'less_than', 100]
      ]
    };
    const parsedQuery = parser.parse();
    expect(parsedQuery).toEqual(expected);
  });

  it('should parse a query string with mixed operators and OR join operation', () => {
    const queryString = 'code="1235" or name:"juan 21" and code>100';
    const parser = new QueryParser(queryString);
    const expected: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['code', 'equals', '1235'],
        ['name', 'contains', 'juan 21'],
        ['code', 'greater_than', 100]
      ]
    };
    const parsedQuery = parser.parse();
    expect(parsedQuery).toEqual(expected);
  });

  it('should handle empty query string', () => {
    const queryString = '';
    const parser = new QueryParser(queryString);
    const expected: QueryStructure = {
      useQuery: false,
      joinOperation: 'AND',
      filters: []
    };
    const parsedQuery = parser.parse();
    expect(parsedQuery).toEqual(expected);
  });

  it('should convert query object back to query string', () => {
    const queryObject: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['ubicationCode', 'equals', '1235'],
        ['name', 'contains', 'juan 21'],
        ['code', 'greater_than', 100]
      ]
    };
    const expectedQueryString = 'ubicationCode="1235" and name:"juan 21" and code>100';
    const parser = new QueryParser('');
    const queryStringFromObject = parser.toQueryString(queryObject);
    expect(queryStringFromObject).toEqual(expectedQueryString);
  });

  it('should return empty string when useQuery is false', () => {
    const queryObject: QueryStructure = {
      useQuery: false,
      joinOperation: 'AND',
      filters: []
    };
    const parser = new QueryParser('');
    const queryStringFromObject = parser.toQueryString(queryObject);
    expect(queryStringFromObject).toEqual('');
  });
  it('should return empty string when useQuery is false', () => {
    const queryObject: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['ubicationCode', 'equals', '1235'],
        ['name', 'contains', 'juan 21'],
        ['code', 'less_than', 100]
      ]
    };
    const parser = new QueryParser('');
    const queryStringFromObject = parser.toQueryString(queryObject);
    expect(queryStringFromObject).toEqual('ubicationCode="1235" and name:"juan 21" and code<100');
  });
  it('should return empty string when useQuery is false', () => {
    const queryObject: QueryStructure = {
      useQuery: true,
      joinOperation: 'AND',
      filters: [
        ['ubicationCode', 'test', '1235'],
        ['name', 'example', 'juan 21'],
        ['code', 'hoi', 100]
      ]
    };
    const parser = new QueryParser('');
    const queryStringFromObject = parser.toQueryString(queryObject);
    expect(queryStringFromObject).toEqual('');
  });
});
