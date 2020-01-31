import React from "react";
import { shallow } from "enzyme";
import EventDetail from "./EventDetails";

it("should renders without crashing", () => {
  shallow(<EventDetail />);
});

it("should show 14 October when 2009-10-14T19:00:00 is provided as dateTimeFrom", () => {
  const event = { dateTimeFrom: "2009-10-14T19:00:00" };
  const wrapper = shallow(<EventDetail eventTranslation={event} />);
  expect(wrapper.find(".Event-details-from-date").text()).toEqual("14 October");
});

it("should not show img.Event-details-thumb when image is null", () => {
  const event = { imgSrc: null };
  const wrapper = shallow(<EventDetail eventTranslation={event} />);
  expect(wrapper.find(".Event-details-thumb")).toHaveLength(0);
});

it("should show img.Event-details-thumb when image is not null", () => {
  const event = { imgSrc: "some url" };
  const wrapper = shallow(<EventDetail eventTranslation={event} />);
  expect(wrapper.find(".Event-details-thumb")).toHaveLength(1);
});
