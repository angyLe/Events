import React from "react";
import { shallow } from "enzyme";
import { EventsInfoPage } from "./EventsInfoPage";

it("should renders without crashing", () => {
  shallow(<EventsInfoPage />);
});
