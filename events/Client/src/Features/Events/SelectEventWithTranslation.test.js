import selectEventWithTranslation from "./SelectEventWithTranslation";
import { selectors as eventTranslationSelectors } from "./EventTranslationHandlers";
import { selectEventById } from "./EventsHandlers";

jest.mock("./EventsHandlers", () => ({
  selectEventById: jest.fn()
}));

describe("test selectEventWithTranslation", () => {
  it("should select event with translation", () => {
    const et = { id: 1, eventId: 2, title: "event2" };
    const eventTranslation = { 1: et };
    const e = { id: 2, url: "www.url.com" };
    const events = { 2: e };
    const state = { eventTranslations: eventTranslation, events };
    const props = { eventId: 2 };

    eventTranslationSelectors.selectEventTranslations = () => eventTranslation;

    eventTranslationSelectors.selectEventTranslationByEventId = () => et;
    selectEventById.mockReturnValue(e);

    const result = selectEventWithTranslation(state, props);
    expect(result).toEqual({
      id: 1,
      eventId: 2,
      title: "event2",
      url: "www.url.com"
    });
  });
});
