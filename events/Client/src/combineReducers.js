import { combineReducers } from "redux";
import events from "./Features/Events/EventsHandlers";
import eventTranslations from "./Features/Events/EventTranslationHandlers"

export default combineReducers({
  events,
  eventTranslations
});
