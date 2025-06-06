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
  | "is_not_empty"
  | "in"
  | "not_in";

export type Filter = [string, FilterOperator, string | number | (string | number)[]];

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
  match: (itemValue: any, filterValue: any) => boolean; // 🔥 Nueva función
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
    match: (v, val) => typeof v === "string" && typeof val === "string" && !v.includes(val),
  },
  {
    operator: "not_equals",
    test: (exp) => exp.includes("!="),
    parse: (exp) => {
      const match = exp.match(/(\w+)!="([^"]+)"/);
      return match ? [match[1], "not_equals", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}!="${value}"`,
    match: (v, val) => v !== val,
  },
  {
    operator: "equals",
    test: (exp) => exp.includes("=") && !exp.includes("!=") && !exp.includes("!:"),
    parse: (exp) => {
      const match = exp.match(/(\w+)="([^"]+)"/);
      return match ? [match[1], "equals", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}="${value}"`,
    match: (v, val) => v === val,
  },
  {
    operator: "contains",
    test: (exp) => exp.includes(":"),
    parse: (exp) => {
      const match = exp.match(/(\w+):"([^"]+)"/);
      return match ? [match[1], "contains", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}:"${value}"`,
    match: (v, val) => typeof v === "string" && typeof val === "string" && v.includes(val),
  },
  {
    operator: "is_not_empty",
    test: (exp) => exp.includes("!?"),
    parse: (exp) => {
      const match = exp.match(/(\w+)!?\?/);
      return match ? [match[1], "is_not_empty", ""] : null;
    },
    serialize: ([field]) => `${field}!?`,
    match: (v) => v !== undefined && v !== null && v !== "",
  },
  {
    operator: "is_empty",
    test: (exp) => exp.includes("?") && !exp.includes("!?"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\?/);
      return match ? [match[1], "is_empty", ""] : null;
    },
    serialize: ([field]) => `${field}?`,
    match: (v) => v === undefined || v === null || v === "",
  },
  {
    operator: "greater_than",
    test: (exp) => exp.includes(">"),
    parse: (exp) => {
      const match = exp.match(/(\w+)>(\d+)/);
      return match ? [match[1], "greater_than", parseInt(match[2], 10)] : null;
    },
    serialize: ([field, , value]) => `${field}>${value}`,
    match: (v, val) => typeof v === "number" && typeof val === "number" && v > val,
  },
  {
    operator: "less_than",
    test: (exp) => exp.includes("<"),
    parse: (exp) => {
      const match = exp.match(/(\w+)<(\d+)/);
      return match ? [match[1], "less_than", parseInt(match[2], 10)] : null;
    },
    serialize: ([field, , value]) => `${field}<${value}`,
    match: (v, val) => typeof v === "number" && typeof val === "number" && v < val,
  },
  {
    operator: "starts_with",
    test: (exp) => exp.includes("^"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\^"([^"]+)"/);
      return match ? [match[1], "starts_with", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}^"${value}"`,
    match: (v, val) => typeof v === "string" && typeof val === "string" && v.startsWith(val),
  },
  {
    operator: "ends_with",
    test: (exp) => exp.includes("$"),
    parse: (exp) => {
      const match = exp.match(/(\w+)\$"([^"]+)"/);
      return match ? [match[1], "ends_with", match[2]] : null;
    },
    serialize: ([field, , value]) => `${field}$"${value}"`,
    match: (v, val) => typeof v === "string" && typeof val === "string" && v.endsWith(val),
  },
  {
    operator: "in",
    test: (exp) => exp.includes("=[") && exp.includes("]"),
    parse: (exp) => {
      const match = exp.match(/(\w+)=\[(.+?)\]/);
      if (!match) return null;
      const values = match[2].split(",").map(v => {
        const trimmed = v.trim().replace(/^"|"$/g, '');
        const num = Number(trimmed);
        return isNaN(num) ? trimmed : num;
      });
      return [match[1], "in", values];
    },
    serialize: ([field, , value]) => {
      const list = (value as (string | number)[]).map(v => `"${v}"`).join(",");
      return `${field}=[${list}]`;
    },
    match: (v, val) => Array.isArray(val) && val.includes(v),
  },
  {
    operator: "not_in",
    test: (exp) => exp.includes("!=") && exp.includes("["),
    parse: (exp) => {
      const match = exp.match(/(\w+)!="\[(.+?)\]"/); // legacy-style edge case
      if (!match) {
        const match2 = exp.match(/(\w+)!=\[(.+?)\]/);
        if (!match2) return null;
        const values = match2[2].split(",").map(v => {
          const trimmed = v.trim().replace(/^"|"$/g, '');
          const num = Number(trimmed);
          return isNaN(num) ? trimmed : num;
        });
        return [match2[1], "not_in", values];
      }
      const values = match[2].split(",").map(v => {
        const trimmed = v.trim().replace(/^"|"$/g, '');
        const num = Number(trimmed);
        return isNaN(num) ? trimmed : num;
      });
      return [match[1], "not_in", values];
    },
    serialize: ([field, , value]) => {
      const list = (value as (string | number)[]).map(v => `"${v}"`).join(",");
      return `${field}!=[${list}]`;
    },
    match: (v, val) => Array.isArray(val) && !val.includes(v),
  }
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
    const { filters, useQuery, joinOperation } = this.parse();
    if (!useQuery || filters.length === 0) return data;

    return data.filter((item) => {
      const results = filters.map(([field, op, val]) => {
        const handler = operatorHandlers.find(h => h.operator === op);
        if (!handler) return false;

        const itemValue = item[field as keyof T];
        return handler.match(itemValue, val);
      });

      return joinOperation === "OR" ? results.some(Boolean) : results.every(Boolean);
    });
  }
}
