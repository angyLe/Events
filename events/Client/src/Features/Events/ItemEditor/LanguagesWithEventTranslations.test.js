import { selectLanguagesWithEventTranslations } from "./LanguagesWithEventTranslation";

const languages = {
  1: { languageId: 1, isoCode: "en" },
  2: { languageId: 2, isoCode: "nb" }
};

const eventTranslations = {
  1: { eventTranslationId: 1, title: "Title1", languageId: 2 },
  2: { eventTranslationId: 2, title: "Title2", languageId: 1 }
};

const state = {
  languages: { languagesList: languages },
  eventTranslations: { eventTranslationsList: eventTranslations }
};

it("should return null if array is empty", () => {
  const result = selectLanguagesWithEventTranslations({});
  expect(result).toEqual([]);
});

it("should return array with length of languages array", () => {
  const result = selectLanguagesWithEventTranslations(state);
  expect(result.length).toBe(2);
});

it("should return array with all properties", () => {
  const result = selectLanguagesWithEventTranslations(state);

  const firstItem = result[0];

  expect(firstItem).toEqual({
    languageId: 1,
    languageIsoCode: "en",
    eventTranslationTitle: "Title2",
    eventTranslationId: 2
  });
});

it("should return object with no event data if eventTranslations is empty ", () => {
  const currentState = { ...state };
  currentState.eventTranslations = { eventTranslations: null };

  const result = selectLanguagesWithEventTranslations(currentState);

  const firstItem = result[0];

  expect(firstItem).toEqual({
    languageId: 1,
    languageIsoCode: "en",
    eventTranslationTitle: null,
    eventTranslationId: null
  });
});
