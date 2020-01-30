import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import events, {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  addEvent,
  updateEvent,
  deleteEvent,
  fetchEventsFromServer
} from "./EventsHandlers";
import * as dependencyApiHelper from "../../Utils/apiHelper";
import { FETCH_STATE } from "../../constants";

describe("events reducer", () => {
  it("should handle initial state", () => {
    expect(events(undefined, {})).toEqual({
      eventsList: null,
      fetchState: null
    });
  });

  it("should handle getEventsStart", () => {
    expect(events({ fetchState: null }, { type: getEventsStart.type })).toEqual(
      {
        fetchState: FETCH_STATE.loading
      }
    );
  });

  it("should handle getEventsSuccess", () => {
    expect(
      events(
        { fetchState: null, eventsList: null },
        {
          type: getEventsSuccess.type,
          payload: []
        }
      )
    ).toEqual({
      fetchState: FETCH_STATE.success,
      eventsList: []
    });
  });

  it("should handle getEventsFailure", () => {
    expect(
      events({ fetchState: null }, { type: getEventsFailure.type })
    ).toEqual({
      fetchState: FETCH_STATE.error
    });
  });

  it("should handle addEvent", () => {
    expect(
      events(
        { eventsList: [] },
        {
          type: addEvent.type,
          payload: { id: 1, title: "title" }
        }
      )
    ).toEqual({ eventsList: [{ id: 1, title: "title" }] });
  });

  it("should handle updateEvent", () => {
    expect(
      events(
        { eventsList: [{ id: 1, title: "title" }] },
        {
          type: updateEvent.type,
          payload: { id: 1, title: "changed title" }
        }
      )
    ).toEqual([{ id: 1, title: "changed title" }]);
  });
});

describe("test actions", () => {
  it("should dispatch actions when fetchEventsFromServer successfully returns data", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    dependencyApiHelper.apiHelper = async () => {
      return [{ id: 1 }];
    };

    const expectedActions = [
      { type: getEventsStart.type },
      { type: getEventsSuccess.type, payload: { 1: { id: 1 } } }
    ];
    const store = mockStore({ eventsList: [] });
    return store.dispatch(fetchEventsFromServer()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch actions when fetchEventsFromServer failed", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    dependencyApiHelper.apiHelper = async () => {
      throw new Error("Error");
    };

    const expectedActions = [
      { type: getEventsStart.type },
      { type: getEventsFailure.type }
    ];
    const store = mockStore({ eventsList: [] });
    return store.dispatch(fetchEventsFromServer()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
