import React from "react";
import { shallow } from "enzyme";
import MediaLibraryImage from "./MediaLibraryImage";

it("should renders without crashing", () => {
  shallow(<MediaLibraryImage />);
});

it("should return null if src is null", () => {
  const wrapper = shallow(<MediaLibraryImage src={null} />);
  expect(wrapper.type()).toEqual(null);
});

it("should have correct width if props.width was provided ", () => {
  const wrapper = shallow(<MediaLibraryImage src="bla.jpg" imgWidth="100px" />);
  expect(wrapper.get(0).props.style).toHaveProperty("width", "100px");
});

it("should have correct height if props.height was provided ", () => {
  const wrapper = shallow(
    <MediaLibraryImage src="bla.jpg" imgHeight="100px" />
  );
  expect(wrapper.get(0).props.style).toHaveProperty("height", "100px");
});
