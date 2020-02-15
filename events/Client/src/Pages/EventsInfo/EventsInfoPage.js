import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EventsList from "../../Features/Events/List/EventsList";
import EventsDatePickerPanel from "../../Features/Events/DataPickerPanel/EventDatepickerPanel";
import {
  selectors as eventTranslationSelectors,
  dateTimeFilterSelectors,
  setPeriod
} from "../../Features/Events/EventTranslationHandlers";
import "./EventsInfoPage.css";
import FetchingState from "../../UI/FetchingState";
import { fetchEventTranslationsFromServer } from "../../Features/Events/EventApi";
import selectEventsFilteredByDate from "../../Features/Events/MemoizedSelectors/SelectEventsFiltredByDate";

// eslint-disable-next-line react/prefer-stateless-function
export const EventsInfoPage = props => {
  const {
    eventsList,
    currentLangId,
    dateFrom,
    dateTo,
    periodType,
    eventsListFetchState,
    onPeriodTypeChanged,
    routesConfig
  } = props;
  const { fetchEvents } = props;

  useEffect(() => {
    fetchEvents({ languageId: currentLangId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLangId]);

  const navigateToEvent = obj => {
    routesConfig.navigateToEventTranslation(obj);
  };

  return (
    <div className="Events-Info-Wrapper">
      <div>
        <EventsDatePickerPanel
          dateFrom={dateFrom}
          dateTo={dateTo}
          handlePeriodTypeChanged={onPeriodTypeChanged}
          periodType={periodType}
        />
      </div>
      <div>
        <FetchingState showLoadingOnInit fetchState={eventsListFetchState}>
          <EventsList
            currentLangId={currentLangId}
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
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  periodType: PropTypes.string.isRequired,
  eventsListFetchState: PropTypes.string,
  fetchEvents: PropTypes.func.isRequired,
  onPeriodTypeChanged: PropTypes.func.isRequired,
  routesConfig: PropTypes.shape({
    navigateToEventTranslation: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { currentLangId, routesConfig } = ownProps;

  const dateFromBla = dateTimeFilterSelectors.selectDateFrom(state);
  const dateToBla = dateTimeFilterSelectors.selectDateTo(state);

  return {
    eventsList: selectEventsFilteredByDate(state, {
      dateFrom: dateFromBla,
      dateTo: dateToBla
    }),
    eventsListFetchState: eventTranslationSelectors.selectEventTranslationsFetchState(
      state
    ),
    currentLangId,
    routesConfig,
    dateFrom: dateTimeFilterSelectors.selectDateFrom(state),
    dateTo: dateTimeFilterSelectors.selectDateTo(state),
    periodType: dateTimeFilterSelectors.selectPeriodType(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: ({ languageId }) => {
      dispatch(fetchEventTranslationsFromServer({ languageId }));
    },
    onPeriodTypeChanged: args => dispatch(setPeriod(args))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsInfoPage)
);
