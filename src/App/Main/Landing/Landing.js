import React from "react";
import "./Landing.css";
import Carousel from 'react-bootstrap/Carousel';


const imagesArray = [
  {creator:"Alex Padurariu",
  image:"alex-padurariu-mqyMjCTWJyQ-unsplash.jpg",
  link:"https://unsplash.com/@alexpadurariu"},
  
  {creator:"Anda Ambrosini",
  image:"anda-ambrosini-UOEB1ztsDMo-unsplash.jpg",
  link:"https://unsplash.com/@andadot"},
  
  {creator:"Chuttersnap",
  image:"chuttersnap-PYBmNk304G4-unsplash.jpg",
  link:"https://unsplash.com/@chuttersnap"},
  
  {creator:"Clem Onojeghuo",
  image:"clem-onojeghuo-w5Z_lEWYirI-unsplash.jpg",
  link:"https://unsplash.com/@clemono"},
  
  {creator:"Erol Ahmed",
  image:"erol-ahmed-_MYcIi9DgYQ-unsplash.jpg",
  link:"https://unsplash.com/@erol"},
  
  {creator:"Erol Ahmed",
  image:"erol-ahmed-leOh1CzRZVQ-unsplash.jpg",
  link:"https://unsplash.com/@erol"},
  
  {creator:"Frank Zhang",
  image:"frank-zhang-N3Z_YghIZlE-unsplash.jpg",
  link:"https://unsplash.com/@terasproductions"},
  
  {creator:"Harshal S Hirve",
  image:"harshal-s-hirve-yNB8niq1qCk-unsplash.jpg",
  link:"https://unsplash.com/@harshalhirve"},
  
  {creator:"Hoach Le Dinh",
  image:"hoach-le-dinh-c8TWWQ5ZnUw-unsplash.jpg",
  link:"https://unsplash.com/@hoachld"},
  
  {creator:"Jeremy Ricketts",
  image:"jeremy-ricketts-h4zs8fbybq4-unsplash.jpg",
  link:"https://unsplash.com/@jeremydgreat"},
  
  {creator:"Jeremy Stewart",
  image:"jeremy-stewart-BvXUtQhTQzk-unsplash.jpg",
  link:"https://unsplash.com/@jeremystewart"},
  
  {creator:"Jez Timms",
  image:"jez-timms-DVRXFIH42d0-unsplash.jpg",
  link:"https://unsplash.com/@jeztimms"},
  
  {creator:"Jimmy Dean",
  image:"jimmy-dean-Yn0l7uwBrpw-unsplash.jpg",
  link:"https://unsplash.com/@jimmydean"},
  
  {creator:"Joanna Hosinska",
  image:"joanna-kosinska-oPsaQVRaXKI-unsplash.jpg",
  link:"https://unsplash.com/@joannakosinska"},
  
  {creator:"Luke Michael",
  image:"luke-michael-1cWZgnBhZRs-unsplash.jpg",
  link:"https://unsplash.com/@lukemichael"},
  
  {creator:"Martin Adams",
  image:"martin-adams-5XXfyMMan84-unsplash.jpg",
  link:"https://unsplash.com/@martinadams"},
  
  {creator:"Massimiliano Martini",
  image:"massimiliano-martini-IeEFsajuORc-unsplash.jpg",
  link:"https://unsplash.com/@mmartini"},
  
  {creator:"Matthew Pilachowski",
  image:"matthew-pilachowski-w1eAFyBLhLM-unsplash.jpg",
  link:"https://unsplash.com/@matthewpilachowski"},
  
  {creator:"Mink Mingle",
  image:"mink-mingle-VjvjEHmITZk-unsplash.jpg",
  link:"https://unsplash.com/@minkmingle"},
  
  {creator:"Olesya Yemets",
  image:"olesya-yemets-fzXVmIUsEbM-unsplash.jpg",
  link:"https://unsplash.com/@ladymilkydeer"},
  
  {creator:"Ricardo Gomez Angel",
  image:"ricardo-gomez-angel-I5XthC605H0-unsplash.jpg",
  link:"https://unsplash.com/@rgaleriacom"},
  
  {creator:"Scott Webb",
  image:"scott-webb-4yNeDDMcJJM-unsplash.jpg",
  link:"https://unsplash.com/@scottwebb"},
  
  {creator:"Shelley Pauls",
  image:"shelley-pauls-7VxiXD3eJBw-unsplash.jpg",
  link:"https://unsplash.com/@shelleypauls"},
  
  {creator:"Sydney Rae",
  image:"sydney-rae-_5TGspSCIdw-unsplash.jpg",
  link:"https://unsplash.com/@srz"},
  
  {creator:"Tom Hermans",
  image:"tom-hermans-IbL3Zd62Q7Q-unsplash.jpg",
  link:"https://unsplash.com/@tomhermans"},
  
  {creator:"Tom Hermans",
  image:"tom-hermans-sVXHGvi5RQ0-unsplash.jpg",
  link:"https://unsplash.com/@tomhermans"},
  
  {creator:"Yoksel Zok",
  image:"yoksel-zok-IWp36PfPYa4-unsplash.jpg",
  link:"https://unsplash.com/@yoksel"},
  
  ]

export default class Landing extends React.Component {
  constructor(props){
    super(props);
    this.state={
      creatorObject:{}
    }
  }
  render() {
    let imageElements = imagesArray.sort((a, b) => 0.5 - Math.random()).map((object,idx) => {
      return <Carousel.Item 
                key = {idx}
                interval={8000}>
                <img
                className="d-block w-100 landing-image"
                src={require(`../../Images/${object.image}`)}
                alt={object.name}
                />
              </Carousel.Item>
    })
    return (
      <div className="landing-container">
        <Carousel indicators={false} controls={false} fade>

            {imageElements}
    
        </Carousel>
      </div>
    );
  }
}
