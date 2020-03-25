import React from "react";

const Buttons = ({ handnleSave, handleCancel }) => {
  return (
    <div className="form-group">
      <div className="col-lg-offset-2 col-lg-10">
        <button className="btn btn-theme" onClick={e=>handnleSave(e)}>
          Save
        </button>
        <button
          className="btn btn-theme04"
          onClick= {e=>handleCancel()}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default Buttons;
