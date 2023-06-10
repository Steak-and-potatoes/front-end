import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import LoginButton from './LoginButton/LoginButton.js';
import LogOutButton from './LogOutButton/LogOutButton.js';
import {withAuth0} from '@auth0/auth0-react';
import {MdFoodBank} from 'react-icons/md';
 
class Header extends React.Component {
  render() {
    // console.log(this.props.auth0.isAuthenticated);
    return (
      <div className="header-container">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"><MdFoodBank/>Go Chef Yourself!</Navbar.Brand>

            {this.props.auth0.isAuthenticated?
              <LogOutButton/>:
              <LoginButton/>}
             
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavItem>
                  <Link to="/" className="nav-link">
                    About
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
                <NavItem>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withAuth0(Header);
