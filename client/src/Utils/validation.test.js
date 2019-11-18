import { validate } from "./validation";


describe("Validation function", () => {
  it("should be defined", () => {
    expect(validate("string")).toBeDefined();
  });

  it("should validate input ", () => {
    const res = {
      status: false,
      error: "Nu poate fi gol"
    };
    expect(validate("")).toEqual(res);
  });

  it("should return error with string longer than 70 characters ", () => {
    const res = {
      status: false,
      error: "Te rog nu cauta mai mult de 70 de caractere"
    };

    const str ="rlrvnvgzzdpyrsaqxyabiotpxacorgsfwschpdxocvzwelxlpwijlijxxxjejsgslvohafk";
    expect(validate(str)).toEqual(res);
  });

  it("should fail if string is longer than 70 char ", () => {
    const res = {
      status: true,
      error: ""
    };

    const str = "rlrvnvgzzdpyrsaqxyabiotpxacorgsfwschpdxocvzwelxlpwijlijxxxjejsgslvohafk";
    expect(validate(str)).not.toEqual(res);
  });

  it("should return true if string is less than 70 char ", () => {
    const res = {
      status: true,
      error: ""
    };

    const str = "rlrvnvgzzdpyrsaqxyabiotpxacorgsfwschpdxocvzwelxlpwijlijxxxjejsgslvoha";
    expect(validate(str)).toEqual(res);
  });
});
