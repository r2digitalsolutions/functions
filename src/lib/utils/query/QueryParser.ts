export type FilterOperator =
  | "equals"
  | "contains"
  | "greater_than"
  | "less_than"
  | "starts_with"
  | "ends_with"
  | "not_equals"
  | "not_contains"
  | "is_empty"
  | "is_not_empty";

export type Filter = [string, FilterOperator, string | number];

export type QueryStructure = {
  useQuery: boolean;
  joinOperation: "AND" | "OR";
  filters: Filter[];
};

type OperatorHandler = {
  operator: FilterOperator;
  test: (exp: string) => boolean;
  parse: (exp: string) => Filter | null;
  serialize: (filter: Filter) => string;
};

const operatorHandlers: OperatorHandler[] = [
  {
    operator: "not_contains",
    test: (exp) => exp.includes("!:"),
    parse: (exp) => {
      const match = exp.match(/(\w+)!:"([^"]+)"/);
      return match ? [match[1], "not_contains", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}!:"${value}"`,
  },
  {
    operator: "not_equals",
    test: (exp) => exp.includes("!="),
    parse: (exp) => {
      const match = exp.match(/(\w+)!="([^"]+)"/);
      return match ? [match[1], "not_equals", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}!="${value}"`,
  },
  {
    operator: "equals",
    test: (exp) => exp.includes("=") && !exp.includes("!=") && !exp.includes("!:"),
    parse: (exp) => {
      const match = exp.match(/(\w+)="([^"]+)"/);
      return match ? [match[1], "equals", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}="${value}"`,
  },
  {
    operator: "contains",
    test: (exp) => exp.includes(":"),
    parse: (exp) => {
      const match = exp.match(/(\w+):"([^"]+)"/);
      return match ? [match[1], "contains", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}:"${value}"`,
  },
  {
    operator: "is_not_empty",
    test: (exp) => exp.includes("!?"),
    parse: (exp) => {
      const match = exp.match(/(\w+)!?\?/);
      return match ? [match[1], "is_not_empty", ""] : null;
    },
    serialize: ([field]) => `${field}!?`,
  },
  {
    operator: "is_empty",
    test: (exp) => exp.includes("?") && !exp.includes("!?"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\?/);
      return match ? [match[1], "is_empty", ""] : null;
    },
    serialize: ([field]) => `${field}?`,
  },
  {
    operator: "greater_than",
    test: (exp) => exp.includes(">"),
    parse: (exp) => {
      const match = exp.match(/(\w+)>(\d+)/);
      return match ? [match[1], "greater_than", parseInt(match[2], 10)] : null;
    },
    serialize: ([field, , value]) => `${field}>${value}`,
  },
  {
    operator: "less_than",
    test: (exp) => exp.includes("<"),
    parse: (exp) => {
      const match = exp.match(/(\w+)<(\d+)/);
      return match ? [match[1], "less_than", parseInt(match[2], 10)] : null;
    },
    serialize: ([field, , value]) => `${field}<${value}`,
  },
  {
    operator: "starts_with",
    test: (exp) => exp.includes("^"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\^"([^"]+)"/);
      return match ? [match[1], "starts_with", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}^"${value}"`,
  },
  {
    operator: "ends_with",
    test: (exp) => exp.includes("$"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\$"([^"]+)"/);
      return match ? [match[1], "ends_with", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}$"${value}"`,
  },
];

export class QueryParser {
  constructor(private queryString: string) { }

  parse(): QueryStructure {
    const expressions = this.queryString
      .replace(/\s+and\s+/gi, " and ")
      .replace(/\s+or\s+/gi, " or ")
      .split(/ and | or /);

    const filters: Filter[] = [];
    let useQuery = false;

    for (const expression of expressions) {
      for (const handler of operatorHandlers) {
        if (handler.test(expression)) {
          const parsed = handler.parse(expression);
          if (parsed) {
            filters.push(parsed);
            useQuery = true;
            break;
          }
        }
      }
    }

    const joinOperation = this.queryString.includes(" or ") ? "OR" : "AND";
    return { useQuery, joinOperation, filters };
  }

  toQueryString(query: QueryStructure): string {
    if (!query.useQuery || query.filters.length === 0) return "";

    const parts = query.filters.map((filter) => {
      const handler = operatorHandlers.find((h) => h.operator === filter[1]);
      return handler?.serialize(filter) ?? "";
    });

    return parts.filter(Boolean).join(` ${query.joinOperation.toLowerCase()} `);
  }

  filter<T>(data: T[]): T[] {
    const { filters, useQuery } = this.parse();
    if (!useQuery || filters.length === 0) return data;

    return data.filter((item) =>
      filters.every(([field, op, val]) => {
        const v = item[field as keyof T];
        switch (op) {
          case "equals": return v === val;
          case "not_equals": return v !== val;
          case "contains": return typeof v === "string" && v.includes(String(val));
          case "not_contains": return typeof v === "string" && !v.includes(String(val));
          case "starts_with": return typeof v === "string" && v.startsWith(String(val));
          case "ends_with": return typeof v === "string" && v.endsWith(String(val));
          case "greater_than": return typeof v === "number" && v > Number(val);
          case "less_than": return typeof v === "number" && v < Number(val);
          case "is_empty": return v == null || v === "";
          case "is_not_empty": return v != null && v !== "";
          default: return false;
        }
      })
    );
  }
}
