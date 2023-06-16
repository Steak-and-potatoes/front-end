import React from "react";
import "./ProfileCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div 
        className="profile-card-container">
        {this.props.displayProfileCard ? (
          <Card
            className="profile-card">
            <Card.Img
              variant="top"
              src={this.props.userPicture}
              alt={this.props.username}
            />
            <Card.Body
              className="profile-card-body">
              <Card.Title
                className="profile-card-text"
                >{`Username: ${
                this.props.username || "unavailable"
              }`}</Card.Title>
              <Card.Text
                className="profile-card-text">{`Email: ${
                this.props.userEmail || "unavailable"
              }`}</Card.Text>
              <Button
                className="edit-button  profile-card-button"
                variant="primary"
                onClick={()=> this.props.handlerUpdateProfileCard(false)}
              >
                Hide Profile
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Card className="profile-card">
            <Card.Body
              className="profile-card-body">
              <Button
                className="edit-button profile-card-button"
                variant="primary"
                onClick={()=>this.props.handlerUpdateProfileCard(true)}
              >
                Show Profile
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default ProfileCard;
