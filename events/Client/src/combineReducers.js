import { combineReducers } from "redux";
import events from "./Features/Events/EventsHandlers";
import eventTranslations from "./Features/Events/EventTranslationHandlers";
import eventEditor from "./Features/Events/EventEditorHandler";
import languages from "./Features/Languages/LanguagesHandlers";

export default combineReducers({
  events,
  eventTranslations,
  eventEditor,
  languages
});
