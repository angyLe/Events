import PropTypes from "prop-types";
import React from "react";

const BgImage = props => {
  const { src, width, height, customClassName } = props;

  if (!src) return null;

  const imgConfig = {
    background: `url(${src})`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    width,
    height,
    backgroundColor: "lightGray"
  };

  return <div className={customClassName || ""} style={imgConfig} />;
};

BgImage.defaultProps = {
  src: null,
  width: "100%",
  height: "100%",
  customClassName: null
};

BgImage.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  customClassName: PropTypes.string
};

export default BgImage;
