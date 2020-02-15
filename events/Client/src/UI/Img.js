import React from "react";
import { Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { IMAGE_IS_NOT_AVAILABLE } from "../constants";

const Img = props => {
  const { imgSrc, className, fluid } = props;
  return <Image fluid={fluid} className={className} src={imgSrc} />;
};

Img.defaultProps = {
  imgSrc: IMAGE_IS_NOT_AVAILABLE,
  className: "",
  fluid: false
};

Img.propTypes = {
  imgSrc: PropTypes.string,
  className: PropTypes.string,
  fluid: PropTypes.bool
};

export default Img;
