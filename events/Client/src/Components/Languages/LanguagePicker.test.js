import React from "react";
import { shallow } from "enzyme";
import LanguagePicker from "./LanguagePicker";

it("should renders without crashing", () => {
  shallow(<LanguagePicker />);
});

it("should be returned null if languages array has only one item", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[{}]} activeLanguageIsoCode="no" />
  );
  expect(wrapper.type()).toEqual(null);
});

it("should be returned null if languages array is empty", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[]} activeLanguageIsoCode="no" />
  );
  expect(wrapper.type()).toEqual(null);
});

it("should returned div.Language-picker if languages array has 2 languages", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[{}, {}]} activeLanguageIsoCode="no" />
  );
  expect(wrapper.find(".Language-picker")).toHaveLength(1);
});

it("should return null if activeLanguageIsoCode is undefined", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[{}, {}]} activeLanguageIsoCode={undefined} />
  );
  expect(wrapper.type()).toEqual(null);
});

it("should return null if activeLanguageIsoCode is null", () => {
  const wrapper = shallow(
    <LanguagePicker languages={[{}, {}]} activeLanguageIsoCode={null} />
  );
  expect(wrapper.type()).toEqual(null);
});
