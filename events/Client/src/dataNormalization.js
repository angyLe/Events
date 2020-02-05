import { schema } from "normalizr";

/** array of events with eventTranslations [{eventId: 1, eventTranslations: []}] */
const eventTranslationsAsPropertyInEvent = new schema.Entity(
  "eventTranslations",
  { event: null },
  {
    idAttribute: "eventTranslationId"
  }
);

export const eventsSchema = new schema.Entity(
  "event",
  {
    eventTranslations: [eventTranslationsAsPropertyInEvent]
  },
  { idAttribute: "eventId" }
);

/** array of event translations with event property [{eventTranslationId: 1, event={eventId:2}}] */
const eventAsPropertyInEventTranslation = new schema.Entity(
  "event",
  {},
  { idAttribute: "eventId" }
);

export const eventTranslationSchema = new schema.Entity(
  "eventTranslations",
  {
    event: eventAsPropertyInEventTranslation
  },
  {
    idAttribute: "eventTranslationId"
  }
);
