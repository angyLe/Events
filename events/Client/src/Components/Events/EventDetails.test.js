import React from "react";
import { shallow } from "enzyme";
import EventDetail from "./EventDetails";

it("should renders without crashing", () => {
  shallow(<EventDetail />);
});

it("should show 14 October when 2009-10-14T19:00:00 is provided as dateTimeFrom", () => {
  const wrapper = shallow(<EventDetail dateTimeFrom="2009-10-14T19:00:00" />);
  expect(wrapper.find(".Event-details-from-date").text()).toEqual("14 October");
});

it("should not show img.Event-details-thumb when image is null", () => {
  const wrapper = shallow(<EventDetail imgSrc={null} />);
  expect(wrapper.find(".Event-details-thumb")).toHaveLength(0);
});

it("should show img.Event-details-thumb when image is not null", () => {
  const wrapper = shallow(<EventDetail imgSrc="some url" />);
  expect(wrapper.find(".Event-details-thumb")).toHaveLength(1);
});
