import React, { useState } from "react";
import {connect} from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import {setAlert} from '../../../redux/actions/alert'
const LoginPage = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
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
        props.setAlert('invalid cred', 'denger')
        return;
      }
      localStorage.setItem("user", user);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-page">
      <div className="container">
        <form className="form-login" onSubmit={e => onSubmit(e)}>
          <h2 className="form-login-heading">sign in now</h2>
          <div className="login-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="User ID"
              autoFocus
              value={email}
              name="email"
              onChange={e => onChange(e)}
            />
            <br /> <br />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={e => onChange(e)}
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
export default connect(null,{setAlert})(LoginPage);
