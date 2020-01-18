import React, { Component } from "react";
import EventsList from "../../Components/Events/EventsList";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventsInfo extends Component {
  render() {
    return (
      <div style={{ display: "flex" }} className="Events-Info-Wrapper">
        <div style={{ width: "100%" }} className="Events">
          <EventsList eveventsList="" />
        </div>
      </div>
    );
  }
}
