import PropTypes from "prop-types";
import React from "react";
import notAvailableImg from "../Images/icon-no-image.svg";

const BgImage = props => {
  const { width, height, customClassName } = props;
  let { src } = props;

  src = src || notAvailableImg;

  const imgConfig = {
    backgroundImage: `url("${src}")`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
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
