import { schema } from "normalizr";

const eventTranslations = new schema.Entity("eventTranslations", {
  idAttribute: "id"
});

const event = new schema.Entity("event", { idAttribute: "id" });

export const eventsSchema = new schema.Entity("event", {
  eventTranslations: [eventTranslations]
});

export const eventTranslationSchema = new schema.Entity("eventTranslations", {
  event
});
