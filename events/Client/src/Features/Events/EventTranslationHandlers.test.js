import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
  operations,
  getEventsTranslationsStart,
  getEventsTranslationsSuccess,
  selectors,
  getEventsTranslationsFailure
} from "./EventTranslationHandlers";
import { getEventsSuccess } from "./EventsHandlers";
import * as dependencyApiHelper from "../../Utils/apiHelper";

describe("eventTranslation operations.createUrlToFetchEventTranslations test", () => {
  it("should return url with language event params if they are provided", () => {
    const result = operations.createUrlToFetchEventTranslations({
      languageId: 1,
      eventId: 20
    });

    expect(result).toEqual(
      `https://localhost:44376/api/event/GetEventTranslations?languageId=1&eventId=20`
    );
  });

  it("should return url with language params if it provided", () => {
    const result = operations.createUrlToFetchEventTranslations({
      languageId: undefined,
      eventId: 5
    });

    expect(result).toEqual(
      `https://localhost:44376/api/event/GetEventTranslations?eventId=5`
    );
  });

  it("should return url without event params if they are not provided", () => {
    const result = operations.createUrlToFetchEventTranslations({
      languageId: undefined,
      eventId: undefined
    });

    expect(result).toEqual(
      `https://localhost:44376/api/event/GetEventTranslations`
    );
  });
});

describe("fetchEventTranslationsFromServer test", () => {
  it("should dispatch actions when fetchEventTranslationsFromServer successfully returns data", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    const event = {
      id: 2
    };
    dependencyApiHelper.apiHelper = async () => {
      return [{ id: 1, eventId: 2, event }];
    };
    const expectedActions = [
      { type: getEventsTranslationsStart.type, payload: undefined },
      {
        type: getEventsTranslationsSuccess.type,
        payload: { 1: { id: 1, eventId: 2, event: 2 } }
      },
      { type: getEventsSuccess.type, payload: { 2: { id: 2 } } }
    ];
    const store = mockStore({ eventsList: [] });
    return store
      .dispatch(
        operations.fetchEventTranslationsFromServer({
          languageId: 1,
          eventId: 1
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("EventTranslationsFromServer selectors test", () => {
  it("should return eventTranslations from selectSlice ", () => {
    const eventTranslations = { 1: { id: 1 }, 2: { id: 2 } };
    const state = { eventTranslations };
    const result = selectors.selectSlice(state);
    expect(result).toEqual(eventTranslations);
  });

  it("should return empty object from selectSlice if state has not eventTranslations ", () => {
    const state = null;
    const result = selectors.selectSlice(state);
    expect(result).toEqual({});
  });

  it("should return eventTranslation from selectEventTranslationByEventId", () => {
    const eventTranslations = {
      1: { id: 1, eventId: 1 },
      2: { id: 2, eventId: 2 }
    };
    const state = { eventTranslations };

    selectors.selectEventTranslations = () => eventTranslations;

    const result = selectors.selectEventTranslationByEventId(state, {
      eventId: 2
    });
    expect(result).toEqual({ id: 2, eventId: 2 });
  });

  it("should return {} from selectEventTranslationByEventId if element was not found", () => {
    const eventTranslations = {
      1: { id: 1, eventId: 1 },
      2: { id: 2, eventId: 2 }
    };
    const state = { eventTranslations };
    const result = selectors.selectEventTranslationByEventId(state, {
      eventId: 3
    });
    expect(result).toEqual({});
  });
});
