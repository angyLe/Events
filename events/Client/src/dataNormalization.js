import { schema } from "normalizr";

const language = new schema.Entity("language", { idAttribute: "id" });

const image = new schema.Entity("image");

// Data about comment will be store in 'comments' object
const eventTranslations = new schema.Entity("eventTranslations", {
  idAttribute: "id"
});

const event = new schema.Entity("event", { idAttribute: "id" });

export const eventsSchema = new schema.Entity("events", {
  image,
  eventTranslations: [eventTranslations]
});

export const eventTranslationSchema = new schema.Entity("eventTranslations", {
  event,
  language
});
