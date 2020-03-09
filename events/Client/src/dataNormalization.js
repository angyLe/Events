import { schema } from "normalizr";

export const getEntityHelper = normalizeData =>
  normalizeData && normalizeData.entities ? normalizeData.entities : {};

/** array of events with eventTranslations [{eventId: 1, eventTranslations: []}] */
const eventTranslationsAsPropertyInEvent = new schema.Entity(
  "eventTranslations",
  { event: null },
  {
    idAttribute: "eventTranslationId"
  }
);

const imageAsPropertyInEvent = new schema.Entity(
  "image",
  {},
  {
    idAttribute: "imageId"
  }
);

export const eventsSchema = new schema.Entity(
  "event",
  {
    eventTranslations: [eventTranslationsAsPropertyInEvent],
    image: imageAsPropertyInEvent
  },
  { idAttribute: "eventId" }
);

/** array of event translations with event property [{eventTranslationId: 1, event={eventId:2}}] */
const eventAsPropertyInEventTranslation = new schema.Entity(
  "event",
  {
    image: imageAsPropertyInEvent
  },
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

/** array of languages */
export const languageSchema = new schema.Entity(
  "languages",
  {},
  {
    idAttribute: "languageId"
  }
);

/** array of images */
export const imageSchema = new schema.Entity(
  "images",
  {},
  {
    idAttribute: "imageId"
  }
);
