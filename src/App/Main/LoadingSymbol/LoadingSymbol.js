import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./LoadingSymbol.css";

export default class LoadingSymbol extends React.Component {
  render() {
    return (
      <div className="loading-symbol-container">
        <Button disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }
}
