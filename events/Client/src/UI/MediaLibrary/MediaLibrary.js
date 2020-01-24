import PropTypes from "prop-types";
import React from "react";
import MediaLibraryImage from "./MediaLibraryImage";
import "./MediaLibrary.css";

const MediaLibrary = props => {
  const { mediaFiles, onFileClick } = props;

  if (!Array.isArray(mediaFiles) || mediaFiles.length <= 0) return null;

  const mediaFilesResult = mediaFiles.map(mediaFile => {
    return (
      <MediaLibraryImage
        key={mediaFile.id}
        src={mediaFile.src}
        onImageClick={onFileClick}
      />
    );
  });

  return <div className="Media-library">{mediaFilesResult}</div>;
};

MediaLibrary.defaultProps = {
  onFileClick: null,
  mediaFiles: [
    { id: 1, src: "https://freesvg.org/img/1531595967.png", name: "image 1" },
    {
      id: 2,
      src: "https://edgex.no/wp-content/uploads/2016/11/events.jpg",
      name: "image 3"
    },
    {
      id: 3,
      src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNUOJjvZwKAdYK5gNLnTW6oCUYZuQU-fcYl9gbCnDHWporW-o3Q&s",
      name: "image 4"
    },
    { id: 4, src: null, name: null },
    { id: 5, src: "https://freesvg.org/img/1531595967.png", name: "image 1" },
    {
      id: 6,
      src: "https://edgex.no/wp-content/uploads/2016/11/event.jpg",
      name: "image 3"
    },
    {
      id: 7,
      src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNUOJjvZwKAdYK5gNLnTW6oCUYZuQU-fcYl9gbCnDHWporW-o3Q&s",
      name: "image 7"
    }
  ]
};

MediaLibrary.propTypes = {
  mediaFiles: PropTypes.instanceOf(Array),
  onFileClick: PropTypes.func
};

export default MediaLibrary;
