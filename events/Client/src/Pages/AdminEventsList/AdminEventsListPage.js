import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EventsList from "../../Features/Events/List/EventsList";
import { eventSelectors } from "../../Features/Events/EventsHandlers";
import FetchingState from "../../UI/FetchingState";
import { fetchEventsFromServer } from "../../Features/Events/EventApi";
import "./AdminEventsList.css";

// eslint-disable-next-line react/prefer-stateless-function
export const AdminEventsListPage = props => {
  const { eventsList, eventsListFetchState, routesConfig } = props;
  const { fetchEvents } = props;

  console.log("eventsList");
  console.log(eventsList);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToEvent = obj => {
    //routesConfig.navigateToEventTranslation(obj);
    //TODO
  };

  return (
    <div className="Admin-Events-Info-Wrapper">
      <div>
        <FetchingState showLoadingOnInit fetchState={eventsListFetchState}>
          <EventsList
            currentLangId={0}
            eventsList={eventsList}
            navigateToEvent={navigateToEvent}
          />
        </FetchingState>
      </div>
    </div>
  );
};

AdminEventsListPage.defaultProps = {
  eventsList: null,
  eventsListFetchState: null
};

AdminEventsListPage.propTypes = {
  eventsList: PropTypes.shape({}),
  eventsListFetchState: PropTypes.string,
  fetchEvents: PropTypes.func.isRequired,
  routesConfig: PropTypes.shape({
    navigateToEventTranslation: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { routesConfig } = ownProps;

  return {
    eventsList: eventSelectors.selectEvents(state),
    eventsListFetchState: eventSelectors.selectFetchState(state),
    routesConfig
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
  connect(mapStateToProps, mapDispatchToProps)(AdminEventsListPage)
);
