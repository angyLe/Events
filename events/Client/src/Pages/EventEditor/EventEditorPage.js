import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Segment, Header } from "semantic-ui-react";
import EventEditor from "../../Features/Events/ItemEditor/EventEditor";
import EventTranslations from "../../Features/Events/ItemEditor/EventTranslation";
import { getLanguagesWithEventTranslations } from "../../Features/Events/ItemEditor/LanguagesWithEventTranslation";
import {
  selectors as eventSelectors,
  setEventInitialData,
  updateEvent as dispatchUpdateEvent,
  updateEventTranslation as dispatchUpdateEventTranslation,
  eventTranslationOperation,
  setEventTranslationInitialFields
} from "../../Features/Events/EventEditorHandler";
import {
  fetchEventsFromServer,
  saveEvent as dispatchSaveEvent
} from "../../Features/Events/EventApi";
import { selectors as eventTranslationSelectors } from "../../Features/Events/EventTranslationHandlers";
import { getParam } from "../../Utils/reduxHelpers";
import { getObjElementByIndex } from "../../Utils/jsTypesHelper";
import FetchingState from "../../UI/FetchingState";
import "./EventEditorPage.css";

const languages = [
  { id: 1, isoCode: "en" },
  { id: 2, isoCode: "nb" },
  { id: 3, isoCode: "ru" }
];

export const EventEditorPage = props => {
  const {
    saveEvent,
    updateEventTranslation,
    updateEvent,
    getEvent,
    eventId,
    currentLanguageId,
    setEventInitialState,
    changeCurrentTranslation,
    eventFetchingState,
    eventFormFields,
    eventSavingState,
    eventTranslations,
    validationErrors
  } = props;

  const languagesWithEvents = getLanguagesWithEventTranslations({
    languages,
    eventTranslations
  });

  useEffect(() => {
    if (eventId) {
      getEvent({ ids: [eventId] }).then(data => {
        const event = getObjElementByIndex(data.events, 0);
        const eventTranslation = getObjElementByIndex(
          data.eventTranslations,
          0
        );
        setEventInitialState({ event, eventTranslation });
      });
    } else {
      // TODO: get language dynamic way
      setEventInitialState({
        event: null,
        eventTranslation: setEventTranslationInitialFields({
          languageId: 1,
          eventId
        })
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendEventToServer = e => {
    e.preventDefault();
    saveEvent(eventFormFields);
  };

  const editOrAddEventTranslation = ({ languageId }) => {
    changeCurrentTranslation({ languageId, eventId });
  };

  return (
    <div className="Event-editor-page">
      <div style={{ width: "58%" }}>
        <Segment className="Event-editor-page-form-segment">
          <Header>Event editor</Header>
          <FetchingState
            showLoadingOnInit={false}
            fetchState={eventFetchingState}
          >
            <EventEditor
              saveEvent={sendEventToServer}
              eventFormFields={eventFormFields}
              eventSavingState={eventSavingState}
              updateEventTranslation={updateEventTranslation}
              updateEvent={updateEvent}
              validationErrors={validationErrors}
            />
          </FetchingState>
        </Segment>
      </div>
      <div style={{ width: "30%", marginLeft: "2%" }}>
        <Segment className="Event-editor-page-translations-segment">
          <Header>Translations</Header>
          <FetchingState showLoadingOnInit fetchState={eventFetchingState}>
            <EventTranslations
              languagesWithEventTranslations={languagesWithEvents}
              currentLanguageId={currentLanguageId}
              editOrAddEventTranslation={editOrAddEventTranslation}
            />
          </FetchingState>
        </Segment>
      </div>
    </div>
  );
};

EventEditorPage.defaultProps = {
  eventFormFields: {},
  eventTranslations: {},
  eventSavingState: null,
  eventFetchingState: null,
  eventId: null,
  currentLanguageId: 0,
  validationErrors: null
};

EventEditorPage.propTypes = {
  eventId: PropTypes.number,
  eventTranslations: PropTypes.shape({}),
  eventFormFields: PropTypes.shape({}),
  eventFetchingState: PropTypes.string,
  eventSavingState: PropTypes.string,
  currentLanguageId: PropTypes.number,
  validationErrors: PropTypes.shape({}),
  setEventInitialState: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  saveEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  updateEventTranslation: PropTypes.func.isRequired,
  changeCurrentTranslation: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { routesConfig } = ownProps;
  let eventId = getParam(ownProps, "eventId");
  eventId = eventId ? parseInt(eventId, 10) : 0;

  return {
    eventId,
    currentLanguageId: eventSelectors.selectCurrentLanguage(state),
    eventTranslations: eventTranslationSelectors.selectEventTranslations(state),
    eventFormFields: eventSelectors.selectEvent(state),
    eventSavingState: eventSelectors.selectEventSavingState(state),
    eventFetchingState: eventSelectors.selectFetchState(state),
    routesConfig,
    validationErrors: eventSelectors.selectValidationErrors(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveEvent: data => {
      dispatch(dispatchSaveEvent(data));
    },
    getEvent: args => dispatch(fetchEventsFromServer(args)),
    setEventInitialState: data => dispatch(setEventInitialData(data)),
    updateEvent: data => dispatch(dispatchUpdateEvent(data)),
    updateEventTranslation: data =>
      dispatch(dispatchUpdateEventTranslation(data)),
    changeCurrentTranslation: data =>
      dispatch(eventTranslationOperation.changeCurrentTranslation(data))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventEditorPage)
);
