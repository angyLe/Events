import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import tr from "../Utils/translationHelper";
import ModalWindow from "./Modal";
import MediaLibrary from "./MediaLibrary/MediaLibrary";
import ImageItem from "../Features/Images/ImageItem";
import "./ImageEditor.css";

const ImageEditor = props => {
  const { imageId, onFileChosen } = props;

  const [fileManagerWindowState, setFileManagerWindowState] = useState(false);

  const onFileClick = chosenFileId => {
    setFileManagerWindowState(false);

    if (!chosenFileId) {
      return;
    }
    onFileChosen({ id: chosenFileId });
  };

  return (
    <>
      <div className="Event-Editor-Form-Img-Wrapper">
        <ImageItem imageId={imageId} isBg />
      </div>
      <ModalWindow
        open={fileManagerWindowState}
        onClose={() => setFileManagerWindowState(false)}
        triggerComponent={
          <Button
            size="mini"
            className="Event-Editor-Form-File-Manager-Btn"
            onClick={() => setFileManagerWindowState(true)}
          >
            {tr("Choose", "Choose")}
          </Button>
        }
        header={tr("FileManagerHeader", "Choose image")}
      >
        <MediaLibrary onFileClick={onFileClick} />
      </ModalWindow>
    </>
  );
};

ImageEditor.defaultProps = {
  imageId: 0
};

ImageEditor.propTypes = {
  imageId: PropTypes.number,
  onFileChosen: PropTypes.func.isRequired
};

export default ImageEditor;
