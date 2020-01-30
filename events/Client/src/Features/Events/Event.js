import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./Events.css";
import { Card } from "semantic-ui-react";
import dayjs from "dayjs";
import EventPrice from "./EventPrice";
import "./Event.css";
import { selectEventTranslationById } from "./EventTranslationHandlers";
import { selectEventById } from "./EventsHandlers";

export const selectEventWithTranslation = createSelector(
  [selectEventTranslationById, selectEventById],
  (eventTranslation, event) => {
    return { ...eventTranslation, ...event };
  }
);

const Event = props => {
  const { event } = props;

  const { imgSrc, title, shortDescription, price, dateTimeFrom } = event;

  return (
    <div className="Event-element">
      <Card
        as="a"
        href=""
        onClick={e => {
          e.preventDefault();
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
  event: {
    imgSrc:
      "https://cdn.pixabay.com/photo/2018/05/31/12/02/celebration-3443810_960_720.jpg"
  }
};

Event.propTypes = {
  event: PropTypes.shape({
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    dateTimeFrom: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state, ownProps) => {
  return {
    event: selectEventWithTranslation(state, ownProps)
  };
};

export default withRouter(connect(mapStateToProps)(Event));
