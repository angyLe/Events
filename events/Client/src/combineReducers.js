import { combineReducers } from "redux";
import events from "./Features/Events/EventsHandlers";
import eventTranslations, {
  dateTimeFilterReducer as eventTranslationsDateFilter
} from "./Features/Events/EventTranslationHandlers";
import eventEditor from "./Features/Events/EventEditorHandler";
import languages from "./Features/Languages/LanguagesHandlers";

export default combineReducers({
  events,
  eventTranslations,
  eventTranslationsDateFilter,
  eventEditor,
  languages
});
