import React from "react";
import { shallow } from "enzyme";
import EventsList from "./EventsList";

it("should renders without crashing", () => {
  shallow(<EventsList />);
});

it("should renders div as wrapper element", () => {
  const wrapper = shallow(<EventsList />);
  expect(wrapper.type()).toEqual("div");
});

it("should show no elmements message if eventsList is null", () => {
  const wrapper = shallow(<EventsList eventsList={null} />);
  expect(wrapper.find(".No-Elements")).toHaveLength(1); // no elements found
});
