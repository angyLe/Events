import React from "react";
import { shallow } from "enzyme";
import AppLogo from "./Logo";

it("should renders without crashing", () => {
  shallow(<AppLogo />);
});
