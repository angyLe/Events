import React from "react";
import EventEditor from "../../Components/Events/EventEditor";
import EventTranslations from "../../Components/Events/EventTranslation";
import { getLanguagesWithEventTranslations } from "../../Modules/LanguagesWithEventTranslation";
import { Segment, Header } from "semantic-ui-react";
import "./EventEditorPage.css";

const languages = [
  { id: 1, isoCode: "en" },
  { id: 2, isoCode: "nb" }
];

const eventTranslations = [
  { id: 1, title: "Title1", languageId: 2 },
  { id: 2, title: "Title2", languageId: 1 }
];

const EventEditorPage = () => {
  const languagesWithEvents = getLanguagesWithEventTranslations({
    languages,
    eventTranslations
  });

  return (
    <div className="Event-editor-page">
      <div style={{ width: "58%" }}>
        <Segment className="Event-editor-page-form-segment">
          <Header>Event editor</Header>
          <EventEditor />
        </Segment>
      </div>
      <div style={{ width: "30%", marginLeft: "2%" }}>
        <Segment className="Event-editor-page-translations-segment">
          <Header>Translations</Header>
          <EventTranslations
            languagesWithEventTranslations={languagesWithEvents}
          />
        </Segment>
      </div>
    </div>
  );
};

export default EventEditorPage;
