import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Recipe.css';

export default class Recipe extends React.Component {
  render () {
      return (
        <div className="recipe-container">
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.themealdb.com/images/media/meals/kvbotn1581012881.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          className="d-block w-100"
          src="https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
      );
  }
}