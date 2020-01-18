import React from "react";
import PropTypes from "prop-types";
import "./Events.css";
import { Card } from "semantic-ui-react";

const Event = props => {
  const { imgSrc, title, shortDescription } = props;

  return (
    <div className="Event-element">
      <Card
        className="Event-element-card"
        image={imgSrc || ""}
        header={title || ""}
        meta="Meta"
        description={shortDescription || ""}
        extra="Extra"
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
  shortDescription: PropTypes.string.isRequired
};

export default Event;
