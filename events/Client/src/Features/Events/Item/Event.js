import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import dayjs from "dayjs";
import EventPrice from "../EventPrice/EventPrice";
import "./Event.css";
import selectEventWithTranslation from "../SelectEventWithTranslation";
import ImageItem from "../../Images/ImageItem";

export const Event = props => {
  const { event, navigateToEvent } = props;

  const { imageId, title, name, shortDescription, price, dateTimeFrom } = event;

  return (
    <div className="Event-element">
      <Card
        as="a"
        href=""
        className="Event-element-card"
        onClick={e => {
          e.preventDefault();
          navigateToEvent();
        }}
      >
        <ImageItem imageId={imageId} />
        <Card.Content>
          <Card.Header>{title || name}</Card.Header>
          <Card.Meta>
            <span className="date">
              {dayjs(dateTimeFrom).format("DD MMMM, HH:MM")}
            </span>
          </Card.Meta>
          <Card.Description>{shortDescription || ""}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <EventPrice price={price} />
        </Card.Content>
      </Card>
    </div>
  );
};

Event.defaultProps = {
  event: {}
};

Event.propTypes = {
  event: PropTypes.shape({
    imgSrc: PropTypes.string,
    imageId: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string,
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
