import React, { Component } from "react";
import EventsList from "../../Components/Events/EventsList";
import EventsDatePickerPanel from "../../Components/Events/EventDatepickerPanel";
import "./EventsInfoPage.css";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventsInfoPage extends Component {
  render() {
    return (
      <div className="Events-Info-Wrapper">
        <div>
          <EventsDatePickerPanel />
        </div>
        <div>
          <EventsList eventsList={null} />
        </div>
      </div>
    );
  }
}
