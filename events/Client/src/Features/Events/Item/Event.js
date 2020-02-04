import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import dayjs from "dayjs";
import EventPrice from "../EventPrice/EventPrice";
import "./Event.css";
import selectEventWithTranslation from "../SelectEventWithTranslation";

export const Event = props => {
  const { event, navigateToEvent } = props;

  const { imgSrc, title, shortDescription, price, dateTimeFrom } = event;

  return (
    <div className="Event-element">
      <Card
        as="a"
        href=""
        onClick={e => {
          e.preventDefault();
          navigateToEvent();
        }}
        className="Event-element-card"
        image={imgSrc || ""}
        header={title || ""}
        meta={dayjs(dateTimeFrom).format("DD MMMM, HH:MM")}
        description={shortDescription || ""}
        extra={
          <div>
            <EventPrice price={price} />
          </div>
        }
      />
    </div>
  );
};

Event.defaultProps = {
  event: {}
};

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    dateTimeFrom: PropTypes.string.isRequired
  }),
  navigateToEvent: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { navigateToEvent, currentLangId, eventId } = ownProps;



  return {
    event: selectEventWithTranslation(state, {
      languageId: currentLangId,
      eventId
    }),
    navigateToEvent
  };
};

export default withRouter(connect(mapStateToProps)(Event));
