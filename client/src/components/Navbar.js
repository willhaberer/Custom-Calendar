import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";
import "../styles/Navbar.css";

import Auth from "../utils/auth";

const Navbar = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const logoutUser = async (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (!userData?.username) {
    return (
      <div id="navbar">
        <Link id="homeLink" to="/">
          <h3 id="createLink">Home</h3>
        </Link>
        <Link id="link" to="/create">
          <h3 id="createLink">Create</h3>
        </Link>
        <Link id="link" to="/mycals">
          <h3 id="createLink">My Cals</h3>
        </Link>
        <Link id="link" to="/profile">
          <h3 id="createLink">Profile</h3>
        </Link>
        <Link id="link" to="/login">
          <h3 id="loginLink">Login</h3>
        </Link>
      </div>
    );
  }

  return (
    <div id="navbar">
      <Link id="link" to="/">
        <h3 id="createLink">Home</h3>
      </Link>
      <Link id="link" to="/create">
        <h3 id="createLink">Create</h3>
      </Link>
      <Link id="link" to="/mycals">
        <h3 id="createLink">My Cals</h3>
      </Link>
      <Link id="link" to="/profile">
        <h3 id="createLink">Profile</h3>
      </Link>
      <h3 id="logout" onClick={logoutUser}>
        Logout
      </h3>
    </div>
  );
};

export default Navbar;
