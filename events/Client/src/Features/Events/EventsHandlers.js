/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { apiHelper } from "../../Utils/apiHelper";
import { FETCH_STATE } from "../../constants";
import { eventsSchema } from "../../dataNormalization";
import { getObj } from "../../Utils/jsTypesHelper";

const initialState = {
  fetchState: null,
  eventsList: null
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEventsStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getEventsSuccess(state, action) {
      state.eventsList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getEventsFailure(state) {
      state.fetchState = FETCH_STATE.error;
    },
    addEvent(state, action) {
      const event = action.payload;
      state.eventsList.push(event);
    },
    updateEvent(state, action) {
      const event = action.payload;
      state.eventsList[event.id] = event;
    },
    deleteEvent(state, action) {
      delete state.eventsList[action.payload.id];
    }
  }
});

export const {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  addEvent,
  updateEvent,
  deleteEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;

/** SELECTORS */
const selectSlice = state => getObj(state).events || {};

export const selectEvents = state => selectSlice(state).eventsList;

export const selectFetchState = state => selectSlice(state).fetchState;

export const selectEventById = (state, props) => {
  console.log("selectEvent");
  console.log(state);
  console.log(props);
  return selectSlice(state).eventsList[props.eventId];
};

/** OPERATIONS */
export const fetchEventsFromServer = () => {
  return (dispatch, getState) => {
    dispatch(getEventsStart());

    return apiHelper({ url: "https://localhost:44376/api/event/GetAll" })
      .then(events => {
        const eventsResult = Array.isArray(events) ? events : [];

        const normalizeData = normalize(eventsResult, [eventsSchema]);
        const eventsNormalized =
          normalizeData && normalizeData.entities
            ? normalizeData.entities.events
            : {};

        dispatch(getEventsSuccess(eventsNormalized));
        return normalizeData;
      })
      .catch(error => {
        dispatch(getEventsFailure());
      });
  };
};
