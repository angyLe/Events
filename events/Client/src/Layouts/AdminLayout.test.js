import React from "react";
import { shallow } from "enzyme";
import AdminLayout from "./AdminLayout";

it("should renders without crashing", () => {
  shallow(<AdminLayout>bla</AdminLayout>);
});
