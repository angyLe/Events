import { schema } from "normalizr";

const image = new schema.Entity("image");

const eventTranslations = new schema.Entity("eventTranslations", {
  idAttribute: "id"
});

const event = new schema.Entity("event", { idAttribute: "id" });

export const eventsSchema = new schema.Entity("events", {
  image,
  eventTranslations: [eventTranslations]
});

export const eventTranslationSchema = new schema.Entity("eventTranslations", {
  event
});
