import React from "react";

const Input = ({ title, text, type }) => {
  return (
    <div className="form-group">
      <label className="col-sm-2 col-sm-2 control-label">{title}</label>
      <div className="col-sm-10">
        <input
          type={`${type}`}
          className="form-control"
          placeholder={`${text}`}
        />
      </div>
    </div>
  );
};

export default Input;
