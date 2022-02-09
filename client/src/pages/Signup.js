import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    songsFound: 0,
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="container">
      <div id="formContainer">
        <h4 id="formHeader">Signup for Custom Calendar</h4>

        <form>
          <input
            value={formState.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />
          <input
            value={formState.username}
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />
          <input
            value={formState.password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <br></br>
          <button id="btn" type="button" onClick={handleFormSubmit}>
            Submit
          </button>
        </form>

        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
};

export default Signup;
