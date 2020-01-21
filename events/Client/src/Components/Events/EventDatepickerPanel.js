import React from "react";
import PropTypes from "prop-types";
import "./EventDatePickerPanel.css";
import { Button } from "semantic-ui-react";
import dayjs from "dayjs";
import tr from "../../Utils/translationHelper";

const EventsDatePickerPanel = props => {
  const { dateFrom, dateTo } = props;
  const btnDefaultColor = "blue";

  return (
    <div className="Events-date-picker-panel">
      <EventsDatePickerPanelNavBtn isPrev />
      <div className="Events-date-picker-period">
        <div>
          {`${dayjs(dateFrom).format("DD MMMM")} -
          ${dayjs(dateTo).format("DD MMMM")}`}
        </div>
        <div className="Events-date-picker-btns">
          <Button.Group floated="left" size="mini" color={btnDefaultColor}>
            <Button active>{tr("Day", "Day")}</Button>
            <Button>{tr("Week", "Week")}</Button>
            <Button>{tr("Month", "Month")}</Button>
          </Button.Group>
        </div>
      </div>
      <EventsDatePickerPanelNavBtn isPrev={false} />
    </div>
  );
};

EventsDatePickerPanel.defaultProps = {
  dateFrom: "2009-10-14T19:00:00",
  dateTo: "2009-10-16T19:00:00"
};

EventsDatePickerPanel.propTypes = {
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string
};

const EventsDatePickerPanelNavBtn = props => {
  const { isPrev = false } = props;
  const btnText = isPrev ? "Prev" : "Next";
  const iconName = isPrev ? "left" : "right";

  return (
    <div className="Events-date-picker-nav-btns">
      <div className="hidden-xs">
        <Button>{tr(`${btnText}DatePeriod`, btnText)}</Button>
      </div>
      <div className="hidden-lg-md">
        <Button icon={`chevron ${iconName}`} />
      </div>
    </div>
  );
};

EventsDatePickerPanelNavBtn.propTypes = {
  isPrev: PropTypes.bool.isRequired
};

export default EventsDatePickerPanel;
