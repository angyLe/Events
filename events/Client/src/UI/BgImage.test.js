import React from "react";
import { shallow } from "enzyme";
import BgImage from "./BgImage";

it("should renders without crashing", () => {
  shallow(<BgImage />);
});

it("should return null if src is null", () => {
  const wrapper = shallow(<BgImage src={null} />);
  expect(wrapper.type()).toEqual(null);
});

it("should have correct width if props.width was provided ", () => {
  const wrapper = shallow(<BgImage src="bla.jpg" width="100px" />);
  expect(wrapper.get(0).props.style).toHaveProperty("width", "100px");
});

it("should have correct height if props.height was provided ", () => {
  const wrapper = shallow(<BgImage src="bla.jpg" height="100px" />);
  expect(wrapper.get(0).props.style).toHaveProperty("height", "100px");
});
