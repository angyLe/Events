import { getParam } from "./reduxHelpers";

describe("getParam test", () => {
  it("should return param from ownProps ", () => {
    const ownProps = { match: { params: { id: 1 } } };
    const result = getParam(ownProps, "id");
    expect(result).toBe(1);
  });

  it("should return null from ownProps if there is no params ", () => {
    const ownProps = {};
    const result = getParam(ownProps, "id");
    expect(result).toBe(null);
  });
});
