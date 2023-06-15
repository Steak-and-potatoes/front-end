import React from 'react';
import './ProfileCard.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ProfileCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render () {
      return (
        <div className="profile-card-container">
          {this.props.displayProfileCard?

          <Card style={{ width: '18rem' }}>
              <Card.Img 
                variant="top" 
                src={this.props.userPicture}
                alt={this.props.username}/>
            <Card.Body>
              <Card.Title>{`Username: ${this.props.username||'unavailable'}`}</Card.Title>
              <Card.Text>{`Email: ${this.props.userEmail||'unavailable'}`}</Card.Text>
              <Button 
                variant="primary"
                onClick={()=>this.props.handlerUpdateProfileCard(false)}
                >Hide Profile</Button>
            </Card.Body>
          </Card>:

          <Card style={{ width: '18rem' }}>

            <Card.Body>
              <Button 
                variant="primary"
                onClick={()=>this.props.handlerUpdateProfileCard(true)}
                >Show Profile</Button>
            </Card.Body>
          </Card>
          }
        </div>
      );
  }
}

export default ProfileCard;

