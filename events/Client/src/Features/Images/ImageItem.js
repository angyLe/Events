import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { imageSelectors } from "./ImagesHandlers";
import Img from "../../UI/Img";
import BgImage from "../../UI/BgImage";
import { API_URL, IMAGE_IS_NOT_AVAILABLE } from "../../constants";

const ImageItem = props => {
  const { image, isBg, width, height, customClassName, fluid } = props;
  const { src, name = "Image is not available" } = image || {};
  const imgSrc = src ? `${API_URL}/${src}` : IMAGE_IS_NOT_AVAILABLE;

  return (
    <>
      {isBg ? (
        <BgImage
          width={width}
          height={height}
          src={imgSrc}
          customClassName={customClassName}
        />
      ) : (
        <Img src={imgSrc} name={name} fluid={fluid} />
      )}
    </>
  );
};

ImageItem.defaultProps = {
  isBg: false,
  width: undefined,
  height: undefined,
  customClassName: null,
  fluid: true,
  image: null
};

ImageItem.propTypes = {
  fluid: PropTypes.bool,
  isBg: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  customClassName: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string
  })
};

const mapStateToProps = (state, ownProps) => {
  const { imageId } = ownProps;

  return {
    image: imageSelectors.selectImageById(state, {
      imageId
    })
  };
};

export default withRouter(connect(mapStateToProps)(ImageItem));
