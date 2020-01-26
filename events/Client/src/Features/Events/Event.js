import React from "react";
import PropTypes from "prop-types";
import "./Events.css";
import { Card } from "semantic-ui-react";
import dayjs from "dayjs";
import EventPrice from "./EventPrice";
import "./Event.css";

const Event = props => {
  const { imgSrc, title, shortDescription, price, dateTime } = props;

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
        meta={dayjs(dateTime).format("DD MMMM, HH:MM")}
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
  imgSrc:
    "https://cdn.pixabay.com/photo/2018/05/31/12/02/celebration-3443810_960_720.jpg"
};

Event.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired
};

export default Event;
