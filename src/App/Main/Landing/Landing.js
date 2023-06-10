import React from 'react';
import './Landing.css';
import Image from 'react-bootstrap/Image';

export default class Landing extends React.Component {
  render () {
      return (
        <div className="landing-container">
          <Image src="holder.js/100px250" fluid />;
        </div>
      );
  }
}