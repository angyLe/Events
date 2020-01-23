import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Routes from "./router";

test("should redirect to home page with default language param in url when iso code is incorrect", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/enn"]}>
      <Routes />
    </MemoryRouter>
  );
  expect(wrapper.find(".Events-Info-Wrapper")).toHaveLength(1);
});

test("should redirect to home page with default language param in url when iso code is not supported", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/ru"]}>
      <Routes />
    </MemoryRouter>
  );
  expect(wrapper.find(".Events-Info-Wrapper")).toHaveLength(1);
});

//TODO: add more tests later