import PropTypes from "prop-types";
import React from "react";
import ImageItem from "../../Features/Images/ImageItem";

const MediaLibraryImage = props => {
  const { id, imgWidth, imgHeight, onImageClick = () => {} } = props;

  if (!id) return null;

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
      <ImageItem imageId={id} isBg customClassName="Media-library-img" />
    </div>
  );
};

MediaLibraryImage.defaultProps = {
  id: null,
  imgWidth: null,
  imgHeight: null,
  onImageClick: () => {}
};

MediaLibraryImage.propTypes = {
  id: PropTypes.number,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  onImageClick: PropTypes.func
};

export default MediaLibraryImage;
