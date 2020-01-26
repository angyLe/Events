import { getLanguagesWithEventTranslations } from "./LanguagesWithEventTranslation";

const languages = [
  { id: 1, isoCode: "en" },
  { id: 2, isoCode: "nb" }
];

const eventTranslations = [
  { id: 1, title: "Title1", languageId: 2 },
  { id: 2, title: "Title2", languageId: 1 }
];

it("should return null if array is empty", () => {
  const result = getLanguagesWithEventTranslations({
    languages: [],
    eventTranslations
  });
  expect(result).toBe(null);
});

it("should return null if array is null", () => {
  const result = getLanguagesWithEventTranslations({
    languages: null,
    eventTranslations
  });
  expect(result).toBe(null);
});

it("should return array with length of languages array", () => {
  const result = getLanguagesWithEventTranslations({
    languages,
    eventTranslations
  });
  expect(result.length).toBe(2);
});

it("should return array with all properties", () => {
  const result = getLanguagesWithEventTranslations({
    languages,
    eventTranslations
  });

  const firstItem = result[0];

  expect(firstItem).toEqual({
    languageId: 1,
    languageIsoCode: "en",
    eventTranslationTitle: "Title2",
    eventTranslationId: 2
  });
});

it("should return object with no event data if eventTranslations is empty ", () => {
  const result = getLanguagesWithEventTranslations({
    languages,
    eventTranslations: []
  });

  const firstItem = result[0];

  expect(firstItem).toEqual({
    languageId: 1,
    languageIsoCode: "en",
    eventTranslationTitle: null,
    eventTranslationId: null
  });
});
