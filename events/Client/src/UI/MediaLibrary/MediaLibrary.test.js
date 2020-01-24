import React from "react";
import { shallow } from "enzyme";
import MediaLibrary from "./MediaLibrary";

it("should renders without crashing", () => {
  shallow(<MediaLibrary />);
});

it("should return null if mediaFiles is null", () => {
  const wrapper = shallow(<MediaLibrary mediaFiles={null} />);
  expect(wrapper.type()).toEqual(null);
});

it("should return null if mediaFiles length is 0", () => {
  const wrapper = shallow(<MediaLibrary mediaFiles={[]} />);
  expect(wrapper.type()).toEqual(null);
});

it("should return .Media-library if mediaFiles contains items", () => {
  const wrapper = shallow(
    <MediaLibrary mediaFiles={[{ id: 1, src: "bla.jpg" }]} />
  );
  expect(wrapper.find(".Media-library")).toHaveLength(1);
});
