import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EventsList from "../../Features/Events/List/EventsList";
import EventsDatePickerPanel from "../../Features/Events/DataPickerPanel/EventDatepickerPanel";
import {
  fetchEventTranslationsFromServer,
  selectors as eventTranslationSelectors
} from "../../Features/Events/EventTranslationHandlers";
import "./EventsInfoPage.css";
import FetchingState from "../../UI/FetchingState";

// eslint-disable-next-line react/prefer-stateless-function
export const EventsInfoPage = props => {
  const {
    eventsList,
    currentLangId,
    eventsListFetchState,
    routesConfig
  } = props;
  const { fetchEvents } = props;

  useEffect(() => {
    fetchEvents({ languageId: currentLangId });
  }, [currentLangId]);

  const navigateToEvent = obj => {
    routesConfig.navigateToEventTranslation(obj);
  };

  return (
    <div className="Events-Info-Wrapper">
      <div>
        <EventsDatePickerPanel />
      </div>
      <div>
        <FetchingState fetchState={eventsListFetchState}>
          <EventsList
            eventsList={eventsList}
            navigateToEvent={navigateToEvent}
          />
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
  currentLangId: PropTypes.number.isRequired,
  eventsListFetchState: PropTypes.string,
  fetchEvents: PropTypes.func.isRequired,
  routesConfig: PropTypes.shape({
    navigateToEventTranslation: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { currentLangId, routesConfig } = ownProps;

  return {
    eventsList: eventTranslationSelectors.selectEventTranslations(state),
    eventsListFetchState: eventTranslationSelectors.selectEventTranslationsFetchState(
      state
    ),
    currentLangId,
    routesConfig
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: ({ languageId }) => {
      dispatch(fetchEventTranslationsFromServer({ languageId }));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsInfoPage)
);
