import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alert";
import { loadUser } from "../../../redux/actions/auth";
import { login } from "../../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import Alert from "../../alert";

const LoginPage = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };
  //Redirect

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div id="login-page">
      <div className="container">
        <form className="form-login" onSubmit={e => onSubmit(e)}>
          <h2 className="form-login-heading">sign in now</h2>
          <div className="login-wrap">
            <Alert />
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
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, loadUser, login })(
  LoginPage
);
