import React from "react";
import PropTypes from "prop-types";
import "./EventDatePickerPanel.css";
import { Button, Icon } from "semantic-ui-react";
import dayjs from "dayjs";
import tr from "../../../Utils/translationHelper";
import { DAY_PERIOD_TYPE } from "../../../constants";
import DateTimeProvider from "../../../Utils/dateTimeProvider";

export const EventsDatePickerHandlers = {
  changePeriodType: args => {
    const {
      periodType = DAY_PERIOD_TYPE.day,
      handlePeriodTypeChanged = () => {}
    } = args;

    const dateFrom = DateTimeProvider.getDate();
    const dateTo = DateTimeProvider.getEndOfCurrentPeriod(dateFrom, periodType);

    handlePeriodTypeChanged({
      dateFrom: DateTimeProvider.getDateAsIsoString(dateFrom),
      dateTo: DateTimeProvider.getDateAsIsoString(dateTo),
      periodType
    });
  },
  moveToNextPeriod: args => {
    const {
      isNext,
      handlePeriodTypeChanged = () => {},
      periodType = DAY_PERIOD_TYPE.day,
      prevDateFrom,
      prevDateTo
    } = args;

    let dateFrom = null;
    let dateTo = null;

    if (isNext) {
      dateFrom = DateTimeProvider.addDate(prevDateTo, 1, "day");
      dateTo = DateTimeProvider.getEndOfCurrentPeriod(dateFrom, periodType);
    } else {
      dateTo = DateTimeProvider.subtractDate(prevDateFrom, 1, "day");
      dateFrom = DateTimeProvider.getStartOfCurrentPeriod(dateTo, periodType);
    }

    handlePeriodTypeChanged({
      dateFrom: DateTimeProvider.getDateAsIsoString(dateFrom),
      dateTo: DateTimeProvider.getDateAsIsoString(dateTo),
      periodType
    });
  }
};

const EventsDatePickerPanel = props => {
  const { dateFrom, dateTo, handlePeriodTypeChanged, periodType } = props;
  const btnDefaultColor = "green";

  let period = DateTimeProvider.getFormat(dateFrom, "DD MMMM");

  if (periodType === DAY_PERIOD_TYPE.week) {
    period = `${dayjs(dateFrom).format("DD MMMM")} - ${dayjs(dateTo).format(
      "DD MMMM"
    )}`;
  } else if (periodType === DAY_PERIOD_TYPE.month) {
    period = dayjs(dateFrom).format("MMMM");
  }

  return (
    <div className="Events-date-picker-panel">
      <EventsDatePickerPanelNavBtn
        moveToNextPeriod={() =>
          EventsDatePickerHandlers.moveToNextPeriod({
            isNext: false,
            handlePeriodTypeChanged,
            periodType,
            prevDateFrom: dateFrom,
            prevDateTo: dateTo
          })
        }
        isPrev
      />
      <div className="Events-date-picker-period">
        <div className="Events-date-picker-period-header">
          <Icon name="calendar alternate outline" />
          {period}
        </div>
        <div className="Events-date-picker-btns">
          <Button.Group floated="left" size="medium" color={btnDefaultColor}>
            <Button
              onClick={() =>
                EventsDatePickerHandlers.changePeriodType({
                  periodType: DAY_PERIOD_TYPE.day,
                  handlePeriodTypeChanged,
                  prevDateFrom: dateFrom
                })
              }
              disabled={periodType === DAY_PERIOD_TYPE.day}
            >
              {tr("Day", "Day")}
            </Button>
            <Button
              onClick={() =>
                EventsDatePickerHandlers.changePeriodType({
                  periodType: DAY_PERIOD_TYPE.week,
                  handlePeriodTypeChanged,
                  prevDateFrom: dateFrom
                })
              }
              disabled={periodType === DAY_PERIOD_TYPE.week}
            >
              {tr("Week", "Week")}
            </Button>
            <Button
              onClick={() =>
                EventsDatePickerHandlers.changePeriodType({
                  periodType: DAY_PERIOD_TYPE.month,
                  handlePeriodTypeChanged,
                  prevDateFrom: dateFrom
                })
              }
              disabled={periodType === DAY_PERIOD_TYPE.month}
            >
              {tr("Month", "Month")}
            </Button>
          </Button.Group>
        </div>
      </div>
      <EventsDatePickerPanelNavBtn
        moveToNextPeriod={() =>
          EventsDatePickerHandlers.moveToNextPeriod({
            isNext: true,
            handlePeriodTypeChanged,
            periodType,
            prevDateFrom: dateFrom,
            prevDateTo: dateTo
          })
        }
        isPrev={false}
      />
    </div>
  );
};

EventsDatePickerPanel.defaultProps = {
  periodType: DAY_PERIOD_TYPE.day
};

EventsDatePickerPanel.propTypes = {
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  handlePeriodTypeChanged: PropTypes.func.isRequired,
  periodType: PropTypes.string
};

const EventsDatePickerPanelNavBtn = props => {
  const { isPrev = false, moveToNextPeriod } = props;
  const btnText = isPrev ? "Prev" : "Next";
  const iconName = isPrev ? "left" : "right";
  const wrapperStyle = isPrev ? { textAlign: "left" } : { textAlign: "right" };

  return (
    <div className="Events-date-picker-nav-btns">
      <div style={wrapperStyle} className="hidden-xs">
        <Button size="large" onClick={moveToNextPeriod}>
          {tr(`${btnText}DatePeriod`, btnText)}
        </Button>
      </div>
      <div style={wrapperStyle} className="hidden-lg-md">
        <Button
          size="large"
          onClick={moveToNextPeriod}
          icon={`chevron ${iconName}`}
        />
      </div>
    </div>
  );
};

EventsDatePickerPanelNavBtn.propTypes = {
  isPrev: PropTypes.bool.isRequired,
  moveToNextPeriod: PropTypes.func.isRequired
};

export default EventsDatePickerPanel;
