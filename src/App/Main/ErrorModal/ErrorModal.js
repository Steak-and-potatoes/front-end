import React from "react";
import Modal from 'react-bootstrap/Modal';
import "./ErrorModal.css";

export default class ErrorModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.displayError} onHide={this.props.handlerClearError}>
        <Modal.Header closeButton>
          <Modal.Title>{`Warning: ${this.props.error}`}</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }
}
