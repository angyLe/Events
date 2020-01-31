import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Routes from "./router";

const mockStore = configureStore([]);
const store = mockStore({
  events: { eventsList: {} }
});

test.skip("should redirect to home page with default language param in url when iso code is incorrect", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/enn"]}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>
  );
  expect(wrapper.find(".Events-Info-Wrapper")).toHaveLength(1);
});

test.skip("should redirect to home page with default language param in url when iso code is not supported", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/ru"]}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>
  );
  expect(wrapper.find(".Events-Info-Wrapper")).toHaveLength(1);
});

//TODO: add more tests later
