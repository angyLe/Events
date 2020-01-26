import React from "react";
import { shallow } from "enzyme";
import EventsDatePickerPanel from "./EventDatepickerPanel";

it("should renders without crashing", () => {
  shallow(<EventsDatePickerPanel />);
});

it("should renders Events-date-picker-panel", () => {
  const wrapper = shallow(<EventsDatePickerPanel />);
  expect(wrapper.find(".Events-date-picker-panel")).toHaveLength(1);
});
