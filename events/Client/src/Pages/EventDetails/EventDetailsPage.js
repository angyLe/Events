import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventDetails from "../../Features/Events/EventDetails";
import tr from "../../Utils/translationHelper";
import "./EventDetailsPage.css";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventDetailsPage extends Component {
  render() {
    return (
      <div className="Event-Details-Wrapper">
        <div className="Event-Details-Back-All-Events">
          <Link to="/">{tr("AllEvents", "All events")}</Link>
        </div>
        <br />
        <EventDetails />
      </div>
    );
  }
}
