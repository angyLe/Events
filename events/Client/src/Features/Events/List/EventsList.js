import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "../Item/Event";
import "./Events.css";
import { getObj, objIsEmpty } from "../../../Utils/jsTypesHelper";

// eslint-disable-next-line react/prefer-stateless-function
export default class EventsList extends Component {
  render() {
    const { eventsList, navigateToEvent, currentLangId } = this.props;

    const eventsListObj = getObj(eventsList);

    let eventsListResult = [];

    if (!objIsEmpty(eventsList)) {
      eventsListResult = Object.keys(eventsListObj).map(el => {
        const element = eventsListObj[el];
 
        return (
          <Event
            key={el}
            currentLangId={currentLangId}
            eventId={element.eventId}
            navigateToEvent={() =>
              navigateToEvent({ eventId: element.eventId })
            }
          />
        );
      });
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
  eventsList: {}
};

EventsList.propTypes = {
  eventsList: PropTypes.shape({}),
  navigateToEvent: PropTypes.func.isRequired,
  currentLangId: PropTypes.number.isRequired
};
