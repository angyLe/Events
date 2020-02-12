import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import languages, {
  getLanguagesStart,
  getLanguagesSuccess,
  getLanguagesFailure,
  languageSelectors
} from "./LanguagesHandlers";
import { languageOperations } from "./LanguageApi";
import * as dependencyApiHelper from "../../Utils/apiHelper";
import { FETCH_STATE } from "../../constants";

describe("languages reducer", () => {
  it("should handle initial state", () => {
    expect(languages(undefined, {})).toEqual({
      languagesList: null,
      fetchState: null
    });
  });

  it("should handle get items start", () => {
    expect(
      languages({ fetchState: null }, { type: getLanguagesStart.type })
    ).toEqual({
      fetchState: FETCH_STATE.loading
    });
  });

  it("should handle get items success", () => {
    expect(
      languages(
        { fetchState: null, languagesList: null },
        {
          type: getLanguagesSuccess.type,
          payload: []
        }
      )
    ).toEqual({
      fetchState: FETCH_STATE.success,
      languagesList: []
    });
  });

  it("should handle get items failure", () => {
    expect(
      languages({ fetchState: null }, { type: getLanguagesFailure.type })
    ).toEqual({
      fetchState: FETCH_STATE.error
    });
  });
});

describe("test actions", () => {
  it("should dispatch actions when fetchLanguagesFromServer successfully returns data", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    dependencyApiHelper.apiHelper = async () => {
      return [{ languageId: 1, isoCode: "en" }];
    };

    const expectedActions = [
      { type: getLanguagesStart.type },
      {
        type: getLanguagesSuccess.type,
        payload: { 1: { languageId: 1, isoCode: "en" } }
      }
    ];
    const store = mockStore({ languagesList: [] });
    return store
      .dispatch(languageOperations.fetchLanguagesFromServer())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should dispatch fail action when fetchLanguagesFromServer failed", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    dependencyApiHelper.apiHelper = async () => {
      throw new Error("Error");
    };

    const expectedActions = [
      { type: getLanguagesStart.type },
      { type: getLanguagesFailure.type }
    ];

    const store = mockStore({ languagesList: [] });
    return store
      .dispatch(languageOperations.fetchLanguagesFromServer())
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("languages selectors test", () => {
  it("should return languages from selectSlice ", () => {
    const items = { 1: { languageId: 1 }, 2: { languageId: 2 } };
    const state = { languages: items };
    const result = languageSelectors.selectSlice(state);
    expect(result).toEqual(items);
  });

  it("should return empty object from selectSlice if state has no items ", () => {
    const state = null;
    const result = languageSelectors.selectSlice(state);
    expect(result).toEqual({});
  });

  it("should return items from selectLanguages", () => {
    const items = { 1: { languageId: 1 }, 2: { languageId: 2 } };
    const state = { languagesList: items };

    languageSelectors.selectSlice = () => state;

    const result = languageSelectors.selectLanguages(state);
    expect(result).toEqual(items);
  });

  it("should return language object from selectLanguageById", () => {
    const items = {
      1: { languageId: 1, isoCode: "en" },
      2: { languageId: 2, isoCode: "no" }
    };
    const state = { languageList: items };

    languageSelectors.selectLanguages = () => items;

    const result = languageSelectors.selectLanguageById(state, {
      languageId: 1
    });
    expect(result).toEqual({ languageId: 1, isoCode: "en" });
  });

  it("should return language object when selectLanguageByIsoCodeFromList", () => {
    const languagesTemp = {
      1: { languageId: 1, isoCode: "en" },
      2: { languageId: 2, isoCode: "no" }
    };

    const result = languageSelectors.selectLanguageByIsoCodeFromList(
      languagesTemp,
      {
        isoCode: "en"
      }
    );
    expect(result).toEqual({ languageId: 1, isoCode: "en" });
  });
});
