import React, { Component } from "react";
import EventDetails from "../../Components/Events/EventDetails";
import "./EventDetailsPage.css";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventDetailsPage extends Component {
  render() {
    return (
      <div className="Event-Details-Wrapper">
        <div>All events</div>
        <EventDetails />
      </div>
    );
  }
}
