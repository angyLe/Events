import PropTypes from "prop-types";
import React from "react";
import BgImage from "../BgImage";

const MediaLibraryImage = props => {
  const { src, imgWidth, imgHeight, onImageClick = () => {} } = props;

  if (!src) return null;

  const imgWrapperStyle = {
    width: imgWidth || "25%",
    height: imgHeight || "100px",
    cursor: "pointer"
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onImageClick}
      style={imgWrapperStyle}
      className="Media-library-item"
      onKeyDown={onImageClick}
    >
      <BgImage src={src} customClassName="Media-library-img" />
    </div>
  );
};

MediaLibraryImage.defaultProps = {
  src: null,
  imgWidth: null,
  imgHeight: null,
  onImageClick: () => {}
};

MediaLibraryImage.propTypes = {
  src: PropTypes.string,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  onImageClick: PropTypes.func
};

export default MediaLibraryImage;
