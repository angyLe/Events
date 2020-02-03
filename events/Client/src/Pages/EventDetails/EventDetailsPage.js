import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import EventDetails from "../../Features/Events/Item/EventDetails";
import tr from "../../Utils/translationHelper";
import "./EventDetailsPage.css";
import { selectors as eventTranslationSelectors } from "../../Features/Events/EventTranslationHandlers";
import FetchingState from "../../UI/FetchingState";
import selectEventWithTranslation from "../../Features/Events/SelectEventWithTranslation";
import { getParam } from "../../Utils/reduxHelpers";
import { fetchEventTranslationsFromServer } from "../../Features/Events/EventApi";

export const EventDetailsPage = props => {
  const {
    eventId,
    eventTranslation,
    currentLangId,
    fetchEvent,
    eventTranslationsFetchState,
    routesConfig
  } = props;

  useEffect(() => {
    fetchEvent({ languageId: currentLangId, eventId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangId, eventId]);

  const navigateToEventsList = e => {
    e.preventDefault();
    routesConfig.navigateToEventsList();
  };

  return (
    <div className="Event-Details-Wrapper">
      <div className="Event-Details-Back-All-Events">
        <button type="button" onClick={navigateToEventsList}>
          {tr("AllEvents", "All events")}
        </button>
      </div>
      <br />
      <FetchingState fetchState={eventTranslationsFetchState}>
        <EventDetails eventTranslation={eventTranslation} />
      </FetchingState>
    </div>
  );
};

EventDetailsPage.defaultProps = {
  eventTranslation: {},
  eventTranslationsFetchState: null
};

EventDetailsPage.propTypes = {
  eventTranslation: PropTypes.shape({}),
  eventTranslationsFetchState: PropTypes.string,
  currentLangId: PropTypes.number.isRequired,
  routesConfig: PropTypes.shape({
    navigateToEventsList: PropTypes.func.isRequired
  }).isRequired,
  eventId: PropTypes.number.isRequired,
  fetchEvent: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { currentLangId, routesConfig } = ownProps;
  let eventId = getParam(ownProps, "id");
  eventId = eventId ? parseInt(eventId, 10) : 0;

  return {
    eventTranslationsFetchState: eventTranslationSelectors.selectEventTranslationsFetchState(
      state
    ),
    eventTranslation: selectEventWithTranslation(state, { eventId }),
    eventId,
    currentLangId,
    routesConfig
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvent: ({ languageId, eventId }) => {
      dispatch(fetchEventTranslationsFromServer({ languageId, eventId }));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage)
);
