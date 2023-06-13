import React from "react";
import "./AttributionModal.css";
import Modal from 'react-bootstrap/Modal';
import {AiOutlineCopy} from 'react-icons/ai';

export default class AttributionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyColor:'black'
    };
  }

  render() {
    return (
      <div className="attribution-modal-container">
        {this.props.displayAttribution &&
          <Modal 
            show={this.props.displayAttribution} 
            onHide={()=>{
              this.props.handlerAttribution({},false);
              this.setState({copyColor:'black'})}}>
            <Modal.Header closeButton>
              <Modal.Title>{`Photographer's Name: ${this.props.attributionObject.creator}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.props.displayAttribution&&
                <img
                  className="d-block w-100"
                  src={require(`../../Images/${this.props.attributionObject.image}`)}
                  alt={this.props.attributionObject.creator}
                />}
              <p>Find more of their work here.<br/>{`${this.props.attributionObject.link} `}
              <AiOutlineCopy 
                style={{color:this.state.copyColor}}
                className="copy-clipboard"
                onClick={()=>{
                  navigator.clipboard.writeText(this.props.attributionObject.link);
                  this.setState({copyColor:'red'});
                  }}/></p>
            </Modal.Body>
          </Modal>}
      </div>
    );
  }
}