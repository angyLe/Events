import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import tr from "../Utils/translationHelper";
import ModalWindow from "./Modal";
import MediaLibrary from "./MediaLibrary/MediaLibrary";
import BgImage from "./BgImage";
import "./ImageEditor.css";

const ImageEditor = props => {
  const { imgSrc } = props;

  const [imageSrc, setImage] = useState(imgSrc);
  const [fileManagerWindowState, setFileManagerWindowState] = useState(false);

  const onFileClick = chosenFile => {
    const { src } = chosenFile;
    setFileManagerWindowState(false);
    setImage(src);
  };

  return (
    <>
      <div className="Event-Editor-Form-Img-Wrapper">
        <BgImage src={imageSrc} />
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
  imgSrc: null //"https://cdn.pixabay.com/photo/2018/05/31/12/02/celebration-3443810_960_720.jpg"
};

ImageEditor.propTypes = {
  imgSrc: PropTypes.string
};

export default ImageEditor;
