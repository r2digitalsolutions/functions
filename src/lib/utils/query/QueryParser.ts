export type FilterOperator = 'equals' | 'contains' | 'greater_than' | 'less_than';
export type Filter = [string, FilterOperator, string | number];

export type QueryStructure = {
  useQuery: boolean;
  joinOperation: 'AND' | 'OR';
  filters: Filter[];
};

export class QueryParser {
  private queryString: string;

  constructor(queryString: string) {
    this.queryString = queryString;
  }

  parse(): QueryStructure {
    const filters: Filter[] = [];
    let joinOperation: 'AND' | 'OR' = 'AND';
    let useQuery = false;

    const expressions = this.queryString.split(/ and | or /);
    expressions.forEach(expression => {
      let match;
      if (expression.includes('=')) {
        match = expression.match(/(\w+)="([^"]+)"/);
        if (match) {
          filters.push([match[1], 'equals', match[2]]);
          useQuery = true;
        }
      } else if (expression.includes(':')) {
        match = expression.match(/(\w+):"([^"]+)"/);
        if (match) {
          filters.push([match[1], 'contains', match[2]]);
          useQuery = true;
        }
      } else if (expression.includes('>')) {
        match = expression.match(/(\w+)>(\d+)/);
        if (match) {
          filters.push([match[1], 'greater_than', parseInt(match[2], 10)]);
          useQuery = true;
        }
      } else if (expression.includes('<')) {
        match = expression.match(/(\w+)<(\d+)/);
        if (match) {
          filters.push([match[1], 'less_than', parseInt(match[2], 10)]);
          useQuery = true;
        }
      }
    });

    if (this.queryString.includes(' and ')) {
      joinOperation = 'AND';
    } else if (this.queryString.includes(' or ')) {
      joinOperation = 'OR';
    }

    return { useQuery, joinOperation, filters };
  }

  toQueryString(queryObject: QueryStructure): string {
    if (!queryObject.useQuery || queryObject.filters.length === 0) {
      return '';
    }

    const filterStrings = queryObject.filters.map(filter => {
      const [field, operator, value] = filter;
      switch (operator) {
        case 'equals':
          return `${field}="${value}"`;
        case 'contains':
          return `${field}:"${value}"`;
        case 'greater_than':
          return `${field}>${value}`;
        case 'less_than':
          return `${field}<${value}`;
        default:
          return '';
      }
    }).filter(Boolean);

    return filterStrings.join(` ${queryObject.joinOperation.toLowerCase()} `);
  }
}