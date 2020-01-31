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
        { eventsList: {} },
        {
          type: addEvent.type,
          payload: { id: 1, title: "title" }
        }
      )
    ).toEqual({ eventsList: { 1: { id: 1, title: "title" } } });
  });

  it("should handle updateEvent", () => {
    expect(
      events(
        { eventsList: { 1: { id: 1, title: "title" } } },
        {
          type: updateEvent.type,
          payload: { id: 1, title: "changed title" }
        }
      )
    ).toEqual({ eventsList: { 1: { id: 1, title: "changed title" } } });
  });

  it("should not update event if id == null", () => {
    expect(
      events(
        { eventsList: { 1: { id: 1, title: "title" } } },
        {
          type: updateEvent.type,
          payload: { id: null, title: "changed title" }
        }
      )
    ).toEqual({ eventsList: { 1: { id: 1, title: "title" } } });
  });

  it("should not add event which is not exist when updateEvent", () => {
    expect(
      events(
        { eventsList: { 1: { id: 1, title: "title" } } },
        {
          type: updateEvent.type,
          payload: { id: 2, title: "changed title" }
        }
      )
    ).toEqual({
      eventsList: {
        1: { id: 1, title: "title" }
      }
    });
  });

  it("should deleteEvent", () => {
    expect(
      events(
        {
          eventsList: {
            1: { id: 1, title: "title" },
            2: { id: 2, title: "2 title" }
          }
        },
        {
          type: deleteEvent.type,
          payload: 1
        }
      )
    ).toEqual({
      eventsList: {
        2: { id: 2, title: "2 title" }
      }
    });
  });

  it("should not deleteEvent if it was not found", () => {
    expect(
      events(
        {
          eventsList: {
            1: { id: 1, title: "title" },
            2: { id: 2, title: "2 title" }
          }
        },
        {
          type: deleteEvent.type,
          payload: 3
        }
      )
    ).toEqual({
      eventsList: {
        1: { id: 1, title: "title" },
        2: { id: 2, title: "2 title" }
      }
    });
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
