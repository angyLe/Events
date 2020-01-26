import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

const ModalWindow = props => {
  const {
    triggerComponent,
    header,
    scrolling,
    open,
    children,
    onClose
  } = props;

  return (
    <Modal onClose={onClose} open={open} closeIcon trigger={triggerComponent}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content scrolling={scrolling}>{children}</Modal.Content>
    </Modal>
  );
};

ModalWindow.defaultProps = {
  open: false,
  triggerComponent: <Button>Open</Button>,
  header: "Provide header",
  scrolling: true,
  onClose: () => {}
};

ModalWindow.propTypes = {
  open: PropTypes.bool,
  triggerComponent: PropTypes.node,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  scrolling: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalWindow;
