import { filters, FiltersValidator } from "./filters.pipe";

describe("FiltersPipe", () => {
  const validator = new FiltersValidator();

  it("should throw as not correct value", () => {
    expect(() => validator.transform("this throws error")).toThrow();
  });
  it("should accept all the values", () => {
    filters.forEach((f) => {
      expect(validator.transform(f)).toBeDefined();
    });
  });
});
