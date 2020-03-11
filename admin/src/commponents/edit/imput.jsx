import React from "react";
import { connect } from "react-redux";

const Input = ({ title, text, type, handleChange, name }) => {
  return (
    <div className="form-group">
      <label className="col-sm-2 col-sm-2 control-label">{title}</label>
      <div className="col-sm-10">
        <input
          onChange={handleChange}
          name={name}
          type={type}
          className="form-control"
          placeholder={text}
        />
      </div>
    </div>
  );
};

export default Input;
