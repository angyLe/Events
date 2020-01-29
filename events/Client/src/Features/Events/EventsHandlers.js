/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import apiHelper from "../../Utils/apiHelper";
import { FETCH_STATE } from "../../constants";

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
      const { event } = action.payload;
      state.eventsList.push(event);
    },
    updateEvent(state, action) {
      const { event } = action.payload;
      state.eventsList[event.id] = event;
    },
    deleteEvent(state, action) {
      delete state.eventsList[action.payload.id];
    }
  }
});

const {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure
} = eventsSlice.actions;

export default eventsSlice.reducer;

/** SELECTORS */
export const selectEvents = state => {
  return state.events.eventsList;
};
export const selectFetchState = state => {
  return state.fetchState;
};

/** OPERATIONS */
export const fetchEventsFromServer = () => {
  return (dispatch, getState) => {
    dispatch(getEventsStart());

    return apiHelper({ url: "https://localhost:44376/api/event/GetAll" })
      .then(data => {
        console.log("fetchEvents success");
        console.log(data);
        dispatch(getEventsSuccess(data));
        return data;
      })
      .catch(error => {
        console.log(error);
        dispatch(getEventsFailure());
      });
  };
};
