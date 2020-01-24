import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

const ModalWindow = props => {
  const { triggerComponent, header, scrolling, children } = props;

  return (
    <Modal closeIcon trigger={triggerComponent}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content scrolling={scrolling}>{children}</Modal.Content>
    </Modal>
  );
};

ModalWindow.defaultProps = {
  triggerComponent: <Button>Open</Button>,
  header: "Provide header",
  scrolling: true
};

ModalWindow.propTypes = {
  triggerComponent: PropTypes.node,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  scrolling: PropTypes.bool
};

export default ModalWindow;
