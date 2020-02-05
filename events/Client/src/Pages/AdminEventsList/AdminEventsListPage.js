import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import EventsList from "../../Features/Events/List/EventsList";
import { eventSelectors } from "../../Features/Events/EventsHandlers";
import FetchingState from "../../UI/FetchingState";
import { fetchEventsFromServer } from "../../Features/Events/EventApi";
import "./AdminEventsList.css";

// eslint-disable-next-line react/prefer-stateless-function
export const AdminEventsListPage = props => {
  const { eventsList, eventsListFetchState, routesConfig } = props;
  const { fetchEvents } = props;

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToEvent = obj => {
    const { eventId } = obj || {};
    routesConfig.navigateToEventEditor({ eventId });
  };

  return (
    <div className="Admin-Events-Info-Wrapper">
      <Segment textAlign="left" style={{ marginLeft: "1%", marginRight: "1%" }}>
        <Button onClick={navigateToEvent} icon="plus" />
      </Segment>
      <FetchingState showLoadingOnInit fetchState={eventsListFetchState}>
        <EventsList
          currentLangId={0}
          eventsList={eventsList}
          navigateToEvent={navigateToEvent}
        />
      </FetchingState>
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
    navigateToEventEditor: PropTypes.func.isRequired
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
