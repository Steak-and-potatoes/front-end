import React from 'react';
import './LoginButton.css';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <Button 
            className="loginButton"
            onClick={() => loginWithRedirect()}>
              Login
              </Button>;
};

