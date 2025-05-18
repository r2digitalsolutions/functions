import { describe, expect, it } from "vitest";
import { formdataToObject } from "./formdataToObject.ts";

describe("formdataToObject", () => {
  it("should return an object from form data", () => {
    const formData = new FormData();
    formData.append("name", "John");
    formData.append("age", "30");
    formData.append("address.street", "123 Main St");
    formData.append("address.city", "New York");
    formData.append("address.state", "NY");
    formData.append("address.zip", "10001");

    const result = formdataToObject(formData);

    expect(result).toEqual({
      name: "John",
      age: "30",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
    });
  });

  it("should handle nested objects", () => {
    const formData = new FormData();
    formData.append("name", "John");
    formData.append("age", "30");
    formData.append("address.street", "123 Main St");
    formData.append("address.city", "New York");
    formData.append("address.state", "NY");
    formData.append("address.zip", "10001");
    formData.append("phones[0].type", "mobile");
    formData.append("phones[0].number", "123456789");
    formData.append("phones[1].type", "home");
    formData.append("phones[1].number", "987654321");

    const result = formdataToObject(formData);

    expect(result).toEqual({
      name: "John",
      age: "30",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      phones: [
        {
          type: "mobile",
          number: "123456789",
        },
        {
          type: "home",
          number: "987654321",
        },
      ],
    });
  });
});