import React from "react";
import { Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { IMAGE_IS_NOT_AVAILABLE } from "../constants";

const Img = props => {
  const { src, className, fluid, name } = props;
  return <Image alt={name} fluid={fluid} className={className} src={src} />;
};

Img.defaultProps = {
  name: "Image is not available",
  src: IMAGE_IS_NOT_AVAILABLE,
  className: "",
  fluid: false
};

Img.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  fluid: PropTypes.bool
};

export default Img;
