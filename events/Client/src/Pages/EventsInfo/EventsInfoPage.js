import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EventsList from "../../Features/Events/EventsList";
import EventsDatePickerPanel from "../../Features/Events/EventDatepickerPanel";
import {
  fetchEventTranslationsByLangIdFromServer,
  selectEventTranslationsFetchState,
  selectEventTranslations
} from "../../Features/Events/EventTranslationHandlers";
import "./EventsInfoPage.css";
import FetchingState from "../../UI/FetchingState";

// eslint-disable-next-line react/prefer-stateless-function
export const EventsInfoPage = props => {
  const { eventsList, languageId, eventsListFetchState } = props;
  const { fetchEvents } = props;

  useEffect(() => {
    if (!eventsList) {
      fetchEvents({ languageId });
    }
  });

  return (
    <div className="Events-Info-Wrapper">
      <div>
        <EventsDatePickerPanel />
      </div>
      <div>
        <FetchingState fetchState={eventsListFetchState}>
          <EventsList eventsList={eventsList} />
        </FetchingState>
      </div>
    </div>
  );
};

EventsInfoPage.defaultProps = {
  eventsList: null,
  eventsListFetchState: null
};

EventsInfoPage.propTypes = {
  eventsList: PropTypes.shape({}),
  languageId: PropTypes.number.isRequired,
  eventsListFetchState: PropTypes.string,
  fetchEvents: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    eventsList: selectEventTranslations(state),
    eventsListFetchState: selectEventTranslationsFetchState(state),
    languageId: 1
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: ({ languageId }) => {
      dispatch(fetchEventTranslationsByLangIdFromServer({ languageId }));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsInfoPage)
);
