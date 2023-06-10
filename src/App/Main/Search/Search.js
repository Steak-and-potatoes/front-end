import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FaMinus} from 'react-icons/fa';
import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query1: {text:"",display:true},
      query2: {text:"",display:true},
      query3: {text:"",display:false}
    };
  }

  handlerUpdateForm = (event) => {
    let {name,value}= event.target;
    this.setState({[name]:{text:value,display:true}});
  }

  handlerAddSearchField = () => {
      if(!this.state.query2.display){
        return this.setState({query2:{text:"",display:true}})
      } else {
        return this.setState({query3:{text:"",display:true}})
      }
  }

  render() {
    console.log(this.state.query1,this.state.query2,this.state.query3)
    return (
      <div className="search-container">
        <Form>
          <Form.Group 
            className="mb-3" 
            controlId="query1">
            <Form.Label>Enter one ingredient per search field and click submit.

            </Form.Label>
                <div className="searchQuery">
                    <Form.Control 
                    type="text" 
                    name="query1"
                    onChange={this.handlerUpdateForm}
                    value={this.state.query1.text}
                    placeholder="ingredient..." />
                  </div>
          </Form.Group>
          <Form.Group 
            className="mb-3" 
            controlId="query2">
              {this.state.query2.display &&
                  <div className="searchQuery">
                    <Form.Control 
                    type="text" 
                    name="query2"
                    onChange={this.handlerUpdateForm}
                    value={this.state.query2.text}
                    placeholder="ingredient..." />
                    <FaMinus onClick={() => this.setState({query2:{text:"",display:false}})}/>
                  </div>}
          </Form.Group>
          <Form.Group 
            className="mb-3" 
            controlId="query3">
              {this.state.query3.display &&
                  <div className="searchQuery">
                    <Form.Control 
                    type="text" 
                    name="query3"
                    onChange={this.handlerUpdateForm}
                    value={this.state.query3.text}
                    placeholder="ingredient..." />
                    <FaMinus onClick={() => this.setState({query3:{text:"",display:false}})}/>
                  </div>}
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit">
            Search
          </Button>
          <Button 
            variant="primary" 
            onClick={this.handlerAddSearchField}>
            Add Ingredient
          </Button>
        
        </Form>
        {/* <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          click
        </Button>
        <div style={{ minHeight: "150px" }}>
          <Collapse in={open} dimension="width">
            <div id="example-collapse-text"></div>
          </Collapse>
        </div> */}
      </div>
    );
  }
}
