import {
  getObj,
  objIsEmpty,
  getObjLength,
  getObjElementByIndex
} from "./jsTypesHelper";

describe("getObj test", () => {
  it("should return empty object if value is null ", () => {
    const result = getObj(null);
    expect(result).toEqual({});
  });

  it("should return value if value is object and not null ", () => {
    const result = getObj({ bla: "bla" });
    expect(result).toEqual({ bla: "bla" });
  });

  it(" should return empty object if value is undefined ", () => {
    const result = getObj(undefined);
    expect(result).toEqual({});
  });
});

describe("objIsEmpty test", () => {
  it("should return true if objIsEmpty is empty ", () => {
    const result = objIsEmpty({});
    expect(result).toEqual(true);
  });

  it("should return return true if value is null", () => {
    const result = objIsEmpty(null);
    expect(result).toEqual(true);
  });

  it("should return return true if value is not an object", () => {
    const result = objIsEmpty([]);
    expect(result).toEqual(true);
  });

  it(" should return false if object is not empty ", () => {
    const result = objIsEmpty({ 1: { bla: 1 } });
    expect(result).toEqual(false);
  });
});

describe("getObjLength test", () => {
  it("should return 0 if objIsEmpty is empty ", () => {
    const result = getObjLength({});
    expect(result).toEqual(0);
  });

  it("should return return 0 if value is null", () => {
    const result = getObjLength(null);
    expect(result).toEqual(0);
  });

  it("should return return 0 if value is not an object", () => {
    const result = getObjLength([]);
    expect(result).toEqual(0);
  });

  it(" should return length if object is not empty ", () => {
    const result = getObjLength({ 1: { bla: 1 } });
    expect(result).toEqual(1);
  });
});

describe("getObjElementByIndex test", () => {
  it("should return undefined if objIsEmpty is empty ", () => {
    const result = getObjElementByIndex({}, 1);
    expect(result).toEqual(undefined);
  });

  it("should return return null if value is null", () => {
    const result = getObjElementByIndex(null, 1);
    expect(result).toEqual(null);
  });

  it("should return return undefined if value is not an object", () => {
    const result = getObjElementByIndex([], 1);
    expect(result).toEqual(undefined);
  });

  it("should return return null if index is null", () => {
    const result = getObjElementByIndex({}, null);
    expect(result).toEqual(null);
  });

  it(" should return length if object is not empty ", () => {
    const obj = { title: "bla" };
    const objOfObj = { 1: obj };

    const result = getObjElementByIndex(objOfObj, 0);
    expect(result).toEqual(obj);
  });
});
