import React from "react";
import { shallow } from "enzyme";
import { LanguagePicker } from "./LanguagePicker";

const languages = {
  2: { isoCode: "nb", name: "norway", id: 1 },
  1: { isoCode: "en", name: "usa", id: 2 }
};

it("should renders without crashing", () => {
  shallow(<LanguagePicker />);
});

it("should be returned null if languages array has only one item", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[{}]} currentLangId={1} />
  );
  expect(wrapper.type()).toEqual(null);
});

it("should be returned null if languages array is empty", () => {
  const wrapper = shallow(<LanguagePicker languages={[]} currentLangId={1} />);
  expect(wrapper.type()).toEqual(null);
});

it("should returned div.Language-picker if languages array has 2 languages", () => {
  const wrapper = shallow(
    <LanguagePicker languages={languages} currentLangId={1} />
  );
  expect(wrapper.find(".Language-picker")).toHaveLength(1);
});
