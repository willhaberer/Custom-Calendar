import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

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
    //add validation that form elements are present
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main id="page">
      <div>
        <div id="formContainer">
          <h4 id="formHeader">Login to Custom Calendar</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br></br>
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                  id="btn"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            <br></br>
            <Link id="signuplink" to="/signup">
              <h3>Sign Up Here</h3>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
