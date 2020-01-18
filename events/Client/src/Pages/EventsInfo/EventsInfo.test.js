import React from "react";
import { shallow } from "enzyme";
import EventsInfo from "./EventsInfo";

it("should renders without crashing", () => {
  shallow(<EventsInfo />);
});
