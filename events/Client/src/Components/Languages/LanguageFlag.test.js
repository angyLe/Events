import React from "react";
import { shallow, render } from "enzyme";
import LanguageFlag from "./LanguageFlag";

it("should renders without crashing", () => {
  shallow(<LanguageFlag />);
});

it("should be added Language-picker-flag-active class if isActive is true", () => {
  const wrapper = render(<LanguageFlag name="norway" isActive />);
  expect(wrapper.find(".Language-picker-flag-active")).toHaveLength(1);
});
