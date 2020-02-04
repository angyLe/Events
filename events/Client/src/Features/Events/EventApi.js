import { batch } from "react-redux";
import { normalize } from "normalizr";
import {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure
} from "./EventsHandlers";
import {
  getEventsTranslationsStart,
  getEventsTranslationsSuccess,
  getEventsTranslationsFailure
} from "./EventTranslationHandlers";
import {
  saveEventStart,
  saveEventSuccess,
  saveEventFailure,
  setValidationErrors
} from "./EventEditorHandler";
import { apiHelper } from "../../Utils/apiHelper";
import { eventTranslationSchema, eventsSchema } from "../../dataNormalization";

export const fetchEventsFromServer = ({ ids = [] }) => {
  return dispatch => {
    dispatch(getEventsStart());

    let urlParams = "";
    if (Array.isArray(ids) && ids.length > 0) {
      urlParams = "?";
      ids.forEach(e => {
        urlParams += `ids=${e}&`;
      });
    }

    return apiHelper({
      url: `https://localhost:44376/api/event/GetAll${urlParams}`
    })
      .then(events => {
        const eventsResult = Array.isArray(events) ? events : [];

        const normalizeData = normalize(eventsResult, [eventsSchema]);
        const entities =
          normalizeData && normalizeData.entities ? normalizeData.entities : {};

        batch(() => {
          dispatch(getEventsTranslationsSuccess(entities.eventTranslations));
          dispatch(getEventsSuccess(entities.event));
        });

        return {
          events: entities.event,
          eventTranslations: entities.eventTranslations
        };
      })
      .catch(error => {
        console.log("error");
        console.log(error);
        dispatch(getEventsFailure());
      });
  };
};

export const eventsOperations = {};

const createUrlToFetchEventTranslations = obj => {
  const { languageId, eventId } = obj || {};

  const urlMainPath = `https://localhost:44376/api/event/GetEventTranslations`;
  const withLanguage = `languageId=${languageId}`;
  const withEvent = `eventId=${eventId}`;
  let urlQueryPath = ``;

  if (languageId != null && eventId != null) {
    urlQueryPath = `?${withLanguage}&${withEvent}`;
  } else if (languageId != null) {
    urlQueryPath = `?${withLanguage}`;
  } else if (eventId != null) {
    urlQueryPath = `?${withEvent}`;
  }

  const url = `${urlMainPath}${urlQueryPath}`;
  return url;
};

export const fetchEventTranslationsFromServer = ({
  languageId = null,
  eventId = null
}) => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    console.log("getEventsTranslationsStart");
    console.log(getEventsTranslationsStart);

    dispatch(getEventsTranslationsStart());

    const url = createUrlToFetchEventTranslations({ languageId, eventId });

    return apiHelper({ url })
      .then(events => {
        const eventsResult = Array.isArray(events) ? events : [];
        const normalizeData = normalize(eventsResult, [eventTranslationSchema]);
        const entities =
          normalizeData && normalizeData.entities ? normalizeData.entities : {};
        batch(() => {
          dispatch(getEventsTranslationsSuccess(entities.eventTranslations));
          dispatch(getEventsSuccess(entities.event));
        });

        return normalizeData;
      })
      .catch(() => {
        dispatch(getEventsTranslationsFailure());
      });
  };
};

export const saveEvent = data => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    dispatch(saveEventStart());

    const url = `https://localhost:44376/api/event/save`;

    return apiHelper({ url, method: "post", dataToSent: data })
      .then(res => {
        dispatch(saveEventSuccess());

        const eventResult = res || {};
        const normalizeData = normalize(eventResult, [eventTranslationSchema]);
        const entities =
          normalizeData && normalizeData.entities ? normalizeData.entities : {};

        let { event, eventTranslation } = entities;
        event = event || {};
        eventTranslation = eventTranslation || {};

        return {
          eventId: event.eventId,
          eventTranslationId: eventTranslation.eventTranslationId,
          event,
          eventTranslation
        };
      })
      .catch(res => {
        console.log("cathc error");
        console.log(res);

        const error = res || {};

        if (error.statusCode === 400) {
          dispatch(setValidationErrors(error.data));
        } else {
          dispatch(saveEventFailure());
        }
      });
  };
};

export const operations = {
  fetchEventTranslationsFromServer,
  createUrlToFetchEventTranslations,
  fetchEventsFromServer,
  saveEvent
};
