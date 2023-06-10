import React from 'react';
import './LogOutButton.css';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <Button 
      onClick={() => logout({ logoutParams: { returnTo: process.env.REACT_APP_AUTH_REDIRECT_URI } })}>
      Log-Out
    </Button>
  );
};

