import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
const LoginPage = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const user = await response.json();

      if (user.error) {
        return;
      }
      localStorage.setItem("user", user);
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-page">
      <div className="container">
        <form className="form-login" onSubmit={handleSubmit}>
          <h2 className="form-login-heading">sign in now</h2>
          <div className="login-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="User ID"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br /> <br />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <br /> <br />
            <button className="btn btn-theme btn-block" type="submit">
              <i className="fa fa-lock"></i> SIGN IN
            </button>
            <hr />
          </div>

          <div
            aria-hidden="true"
            aria-labelledby="myModalLabel"
            role="dialog"
            tabIndex="-1"
            id="myModal"
            className="modal fade"
          ></div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(LoginPage);
