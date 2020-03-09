import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MediaLibraryImage from "./MediaLibraryImage";
import { imageOperations } from "../../Features/Images/ImagesApi";
import { imageSelectors } from "../../Features/Images/ImagesHandlers";
import FetchingState from "../FetchingState";
import { objIsEmpty } from "../../Utils/jsTypesHelper";
import { API_URL } from "../../constants";
import "./MediaLibrary.css";

export const MediaLibrary = props => {
  const {
    mediaFiles,
    onFileClick,
    fetchImagesFromServer,
    mediaFilesFetchingState
  } = props;

  useEffect(() => {
    fetchImagesFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mediaFilesResult = [];

  if (!objIsEmpty(mediaFiles)) {
    Object.entries(mediaFiles).forEach(([key, value]) => {
      mediaFilesResult.push(
        <MediaLibraryImage
          key={key}
          id={key ? Number(key) : null}
          src={`${API_URL}/${value.src}`}
          onImageClick={() => onFileClick(key)}
        />
      );
    });
  }

  return (
    <div className="Media-library">
      <FetchingState showLoadingOnInit fetchState={mediaFilesFetchingState}>
        {mediaFilesResult}
      </FetchingState>
    </div>
  );
};

MediaLibrary.defaultProps = {
  onFileClick: null,
  mediaFilesFetchingState: null,
  mediaFiles: []
};

MediaLibrary.propTypes = {
  mediaFiles: PropTypes.shape({ imageId: PropTypes.number }),
  onFileClick: PropTypes.func,
  fetchImagesFromServer: PropTypes.func.isRequired,
  mediaFilesFetchingState: PropTypes.string
};

const mapStateToProps = state => {
  return {
    mediaFiles: imageSelectors.selectImages(state),
    mediaFilesFetchingState: imageSelectors.selectFetchState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImagesFromServer: () =>
      dispatch(imageOperations.fetchImagesFromServer())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MediaLibrary)
);
