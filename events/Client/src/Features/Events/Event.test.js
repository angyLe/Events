import React from "react";
import { shallow } from "enzyme";
import Event from "./Event";

it("should renders without crashing", () => {
  shallow(<Event />);
});
