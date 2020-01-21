import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";

const EventPrice = props => {
  const { price } = props;

  if (!Number.isInteger(price)) return null;

  if (price > 0) {
    return <Label className="Event-Price">{`NOK ${price}`}</Label>;
  }
  return (
    <Label className="Event-Price-Free" color="green">
      Free!
    </Label>
  );
};

EventPrice.propTypes = {
  price: PropTypes.number.isRequired
};

export default EventPrice;
