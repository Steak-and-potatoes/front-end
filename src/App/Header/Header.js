import React from "react";
import "./Header.css";
// import Container from "react-bootstrap/Container";
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import LoginButton from './LoginButton/LoginButton.js';
import LogOutButton from './LogOutButton/LogOutButton.js';
import {withAuth0} from '@auth0/auth0-react';
import icon from '../Images/icon/cooking.png'
 
class Header extends React.Component {
  render() {
    // console.log(this.props.auth0.isAuthenticated);
    return (
      // <div className="header-container">
        <Navbar bg="light" expand="lg">
        {/* <Container className="container"> */}
            <Navbar.Brand><img src={icon} alt="cooking icon" />Go Chef Yourself!</Navbar.Brand>
             
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavItem>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/search" className="nav-link">
                    Search
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/recipe" className="nav-link">
                    Recipe
                  </Link>
                </NavItem>
                {this.props.auth0.isAuthenticated?
                <NavItem>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </NavItem>:
                null
                }
              </Nav>
            </Navbar.Collapse>

            {this.props.auth0.isAuthenticated?
            <logOutButton/>:
            <LoginButton/>}
          {/* </Container> */}
        </Navbar>
      // </div>
    );
  }
}

export default withAuth0(Header);
