import { batch } from "react-redux";
import { normalize } from "normalizr";
import {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  addEvent,
  updateEvent
} from "./EventsHandlers";
import {
  getEventsTranslationsStart,
  getEventsTranslationsSuccess,
  getEventsTranslationsFailure,
  addEventTranslation,
  updateEventTranslation
} from "./EventTranslationHandlers";
import {
  saveEventStart,
  saveEventSuccess,
  saveEventFailure,
  setValidationErrors
} from "./EventEditorHandler";
import { apiHelper } from "../../Utils/apiHelper";
import { eventTranslationSchema, eventsSchema } from "../../dataNormalization";
import { getObjElementByIndex, objIsEmpty } from "../../Utils/jsTypesHelper";

export const fetchEventsFromServer = args => {
  return dispatch => {
    const { ids = null } = args || {};
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

    const url = `https://localhost:44376/api/event/save`; // TODO!!  domen should be configured per environment

    const { eventId } = data;
    const { eventTranslationId } = data;

    return apiHelper({ url, method: "post", dataToSent: data })
      .then(res => {
        const eventResult = res || {};
        const normalizeData = normalize(eventResult, eventsSchema);

        const entities =
          normalizeData && normalizeData.entities ? normalizeData.entities : {};

        const { event, eventTranslations } = entities;

        const ev = getObjElementByIndex(event, 1);
        const et = getObjElementByIndex(eventTranslations, 1);

        batch(() => {
          dispatch(saveEventSuccess());

          if (!objIsEmpty(event)) {
            if (!eventId) {
              dispatch(addEvent(ev));
            } else {
              dispatch(updateEvent(ev));
            }
          }

          if (!objIsEmpty(eventTranslations)) {
            if (!eventTranslationId) {
              dispatch(addEventTranslation(et));
            } else {
              dispatch(updateEventTranslation(et));
            }
          }
        });

        return {
          event,
          eventTranslations
        };
      })
      .catch(res => {
        const error = res || {};
        console.log(res);

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
