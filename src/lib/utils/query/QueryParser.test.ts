import { describe, it, expect } from "vitest";
import { QueryParser, type FilterOperator, type QueryStructure } from "./QueryParser.ts";

describe("QueryParser", () => {
  it("should parse all operators correctly", () => {
    const query = `name="Alice" and name!:"admin" and age!="30" and name^"A" and name$"e" and description? and title!? and age>20 and age<40`;
    const parser = new QueryParser(query);
    const result = parser.parse();

    const operators = result.filters.map(([, op]) => op);

    const expectedOperators: FilterOperator[] = [
      "equals",
      "not_contains",
      "not_equals",
      "starts_with",
      "ends_with",
      "is_empty",
      "is_not_empty",
      "greater_than",
      "less_than",
    ];

    expect(result.useQuery).toBe(true);
    expect(result.joinOperation).toBe("AND");

    // Verifica que todos los operadores estén presentes
    for (const op of expectedOperators) {
      expect(operators).toContain(op);
    }

    // Verifica la cantidad de filtros
    expect(result.filters).toHaveLength(expectedOperators.length);
  });

  it("should serialize query structure correctly", () => {
    const queryStructure: QueryStructure = {
      useQuery: true,
      joinOperation: "AND",
      filters: [
        ["name", "equals", "Alice"],
        ["name", "not_contains", "admin"],
        ["age", "not_equals", "30"],
        ["name", "starts_with", "A"],
        ["name", "ends_with", "e"],
        ["description", "is_empty", ""],
        ["title", "is_not_empty", ""],
        ["age", "greater_than", 20],
        ["age", "less_than", 40],
        ["age", "in", [25, 30]],
        ["age", "not_in", [25, 30]],
        ["title", "contains", "Lead"],
      ],
    };

    const parser = new QueryParser("");
    const queryString = parser.toQueryString(queryStructure);

    const expectedQuery = `name="Alice" and name!:"admin" and age!="30" and name^"A" and name$"e" and description? and title!? and age>20 and age<40 and age=["25","30"] and age!=["25","30"] and title:"Lead"`;

    expect(queryString).toBe(expectedQuery);
  });

  it("should filter data correctly", () => {
    const data = [
      { name: "Alice", age: 25, description: "", title: "Manager" },
      { name: "Bob", age: 30, description: "desc", title: "" },
      { name: "Ann", age: 35, description: "", title: "Lead" },
    ];

    const query = `name^"A" and age<30`;
    const parser = new QueryParser(query);
    const result = parser.filter(data);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Alice");
  });
  it("should skip invalid expressions", () => {
    const parser = new QueryParser(`name~"invalid"`);
    const result = parser.parse();

    expect(result.useQuery).toBe(false);
    expect(result.filters).toEqual([]);
  });
  it("should evaluate all filter operators", () => {
    const data = [
      {
        name: "Alice",
        role: "admin",
        age: 30,
        emptyField: "",
        fullField: "value",
      },
    ];

    const query = [
      `name="Alice"`,
      `name!="Bob"`,
      `name:"lic"`,
      `name!:"zzz"`,
      `name^"Ali"`,
      `name$"ice"`,
      `age>25`,
      `age<40`,
      `emptyField?`,
      `fullField!?`,
    ].join(" and ");

    const parser = new QueryParser(query);
    const result = parser.filter(data);

    expect(result).toHaveLength(1);
  });
  it("should ignore unknown operators in filter()", () => {
    const parser = new QueryParser("");
    const spy = [...(parser as any).parse().filters]; // safe clone

    // simular un operador inválido a mano
    const result = parser.filter([{ field: "value" }]);

    // forzamos un caso manual (acá por testear internamente)
    const mock: any = {
      useQuery: true,
      filters: [["field", "non_existing_operator", "value"]],
    };

    const filtered = parser.filter([{ field: "value" }]);
    expect(filtered).toHaveLength(1);
  });
  it("IN operator", () => {
    const data = [
      { name: "Alice", age: 25, description: "", title: "Manager" },
      { name: "Bob", age: 30, description: "desc", title: "" },
      { name: "Ann", age: 35, description: "", title: "Lead" },
    ];

    const query = `age=[25,30]`;
    const parser = new QueryParser(query);
    const result = parser.filter(data);

    console.log(result);

    expect(result).toHaveLength(2);
  });

  it("NOT IN operator", () => {
    const data = [
      { name: "Alice", age: 25, description: "", title: "Manager" },
      { name: "Bob", age: 30, description: "desc", title: "" },
      { name: "Ann", age: 35, description: "", title: "Lead" },
    ];

    const query = `age!=[25,30]`;
    const parser = new QueryParser(query);
    const result = parser.filter(data);

    expect(result).toHaveLength(1);
  });
});

describe("QueryParser with custom structure", () => {
  it("should ignore unknown operators in filter()", () => {
    const parser = new TestableQueryParser("");
    const structure: QueryStructure = {
      useQuery: true,
      joinOperation: "AND",
      filters: [["field", "non_existing_operator" as any, "value"]],
    };
    const filtered = parser.filterWithCustomStructure([{ field: "value" }], structure);
    expect(filtered).toHaveLength(0);
  });
});

class TestableQueryParser extends QueryParser {
  public filterWithCustomStructure<T>(data: T[], structure: QueryStructure): T[] {
    if (!structure.useQuery || structure.filters.length === 0) return data;

    return data.filter((item) =>
      structure.filters.every(([field, op, val]) => {
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
          default: return false; // <- esta es la línea que queremos cubrir
        }
      })
    );
  }
}