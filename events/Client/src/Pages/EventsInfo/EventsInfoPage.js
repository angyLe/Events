import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EventsList from "../../Features/Events/EventsList";
import EventsDatePickerPanel from "../../Features/Events/EventDatepickerPanel";
import {
  fetchEventsFromServer,
  selectEvents
} from "../../Features/Events/EventsHandlers";
import "./EventsInfoPage.css";

// eslint-disable-next-line react/prefer-stateless-function
export const EventsInfoPage = props => {
  const { eventsList } = props;
  const { fetchEvents } = props;

  console.log("eventsList");
  console.log(eventsList);

  useEffect(() => {
    console.log("effect");

    if (!eventsList) {
      fetchEvents();
    }
  });

  return (
    <div className="Events-Info-Wrapper">
      <div>
        <EventsDatePickerPanel />
      </div>
      <div>
        <EventsList eventsList={eventsList} />
      </div>
    </div>
  );
};

EventsInfoPage.defaultProps = {
  eventsList: null
};

EventsInfoPage.propTypes = {
  eventsList: PropTypes.instanceOf(Array),
  fetchEvents: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    eventsList: selectEvents(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => {
      dispatch(fetchEventsFromServer());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsInfoPage)
);
