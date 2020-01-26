import React from "react";
import { shallow } from "enzyme";
import EventPrice from "./EventPrice";

it("should renders without crashing", () => {
  shallow(<EventPrice />);
});

it("should show info that event is free", () => {
  const wrapper = shallow(<EventPrice price={0} />);
  expect(wrapper.find(".Event-Price-Free")).toHaveLength(1); // no elements found
});

it("should show price when price is more then 0", () => {
  const wrapper = shallow(<EventPrice price={10} />);
  expect(wrapper.find(".Event-Price")).toHaveLength(1); // no elements found
});

it("should not render component if price is a string", () => {
  const wrapper = shallow(<EventPrice price="10" />);
  expect(wrapper.type()).toEqual(null);
});

it("should not render component if price is Nan", () => {
  const wrapper = shallow(<EventPrice price={NaN} />);
  expect(wrapper.type()).toEqual(null);
});
