import React from "react";
import { shallow } from "enzyme";
import DateTimeProvider from "../../../Utils/dateTimeProvider";
import EventsDatePickerPanel, {
  EventsDatePickerHandlers
} from "./EventDatepickerPanel";
import { DAY_PERIOD_TYPE } from "../../../constants";

it("should renders without crashing", () => {
  shallow(<EventsDatePickerPanel />);
});

it("should renders Events-date-picker-panel", () => {
  const wrapper = shallow(<EventsDatePickerPanel />);
  expect(wrapper.find(".Events-date-picker-panel")).toHaveLength(1);
});

describe.only("test EventsDatePickerHandlers", () => {
  it("changePeriodType should call callback with dateTo set to the end of the current day if periodType - day", () => {
    const args = {
      periodType: DAY_PERIOD_TYPE.day,
      handlePeriodTypeChanged: jest.fn(),
      prevDateFrom: "2020-01-26T02:00:00.000Z"
    };

    EventsDatePickerHandlers.changePeriodType(args);

    expect(args.handlePeriodTypeChanged).toBeCalled();
  });
});
