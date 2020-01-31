/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { normalize } from "normalizr";
import { apiHelper } from "../../Utils/apiHelper";
import { FETCH_STATE } from "../../constants";
import { eventTranslationSchema } from "../../dataNormalization";
import { getEventsSuccess } from "./EventsHandlers";
import { getObj } from "../../Utils/jsTypesHelper";
import { resetAction } from "../RootApp/RootAppHandlers";

const initialState = {
  fetchState: null,
  eventTranslationsList: null
};

/** REDUCER */
const eventTranslationsSlice = createSlice({
  name: "eventTranslations",
  initialState,
  reducers: {
    getEventsTranslationsStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getEventsTranslationsSuccess(state, action) {
      state.eventTranslationsList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getEventsTranslationsFailure(state) {
      state.fetchState = FETCH_STATE.error;
    }
  },
  extraReducers: builder =>
    builder.addCase(resetAction, (state, action) => {
      return initialState;
    })
});

export const {
  getEventsTranslationsStart,
  getEventsTranslationsSuccess,
  getEventsTranslationsFailure
} = eventTranslationsSlice.actions;

export default eventTranslationsSlice.reducer;

/** END REDUCER */

/** SELECTORS */

/** To be able to test put all selectors into selectors object. Because of problem with
 * mocking of inner functions which is declared in the same file.
 */
export const selectors = {
  selectSlice: state => getObj(state).eventTranslations || {},
  selectEventTranslations: state =>
    selectors.selectSlice(state).eventTranslationsList || {},
  selectEventTranslationsFetchState: state =>
    selectors.selectSlice(state).fetchState,
  selectEventTranslationById: (state, props) => {
    return (
      selectors.selectEventTranslations(state)[props.eventTranslationId] || {}
    );
  },
  selectEventTranslationByEventId: (state, props) => {
    const eventTranslations = selectors.selectEventTranslations(state);

    const item = Object.values(eventTranslations).find(el => {
      return el.eventId == props.eventId;
    });

    console.log("%c selectEventTranslationByEventId", "color:brown");
    console.log(item);
    console.log(props.eventId);

    return item || {};
  }
};

/** END SELECTORS */

/** OPERATIONS */
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

export const operations = {
  fetchEventTranslationsFromServer,
  createUrlToFetchEventTranslations
};
