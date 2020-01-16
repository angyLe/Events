import React from "react";
import { render } from "@testing-library/react";
import DefaultLayout from "./DefaultLayout";

test("renders learn react link", () => {
  const { getByText } = render(<DefaultLayout />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
