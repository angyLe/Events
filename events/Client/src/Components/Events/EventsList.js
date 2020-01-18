import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import "./Events.css";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventsList extends Component {
  render() {
    let { eventsList } = this.props;

    eventsList = Array.isArray(eventsList) ? eventsList : [];

    let eventsListResult = [];
    if (eventsList.length > 0) {
      eventsListResult = eventsList.map(element => (
        <Event
          key={element.id}
          imgSrc={element.imgSrc}
          title={element.title}
          shortDescription={element.shortDescription}
        />
      ));
    }

    return (
      <div className="Events-List">
        {eventsListResult.length > 0 ? (
          eventsListResult
        ) : (
          <div className="No-Elements">There is no events</div>
        )}
      </div>
    );
  }
}

EventsList.defaultProps = {
  eventsList: [
    {
      id: 1,
      imgSrc:
        "https://p2.piqsels.com/preview/386/718/530/balloon-bunch-sunlight-smile.jpg",
      title: "First event",
      shortDescription: "About first event"
    },
    { id: 2, title: "Second event", shortDescription: "About second event" },
    {
      id: 3,
      imgSrc:
        "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_960_720.jpg",
      title: "Eliot Black",
      shortDescription:
        "Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
    },
    {
      id: 4,
      title: "Cat Black",
      shortDescription: "Cat is a sound engineer living in Nashville who enjoys"
    },
    {
      id: 5,
      title: "Cat Black",
      shortDescription:
        "Matthew is a musician living in Nashville.Cat is a sound engineer living in Nashville who enjoys. "
    }
  ]
};

EventsList.propTypes = {
  eventsList: PropTypes.instanceOf(Array)
};
