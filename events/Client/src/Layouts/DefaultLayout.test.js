import React from "react";
import { shallow } from "enzyme";
import DefaultLayout from "./DefaultLayout";

it("should renders without crashing", () => {
  shallow(<DefaultLayout>bla</DefaultLayout>);
});
