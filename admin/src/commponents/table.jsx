import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import "../css/table-responsive.css";

const Table = ({ titles, items, handleDelete, path }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <table className="table table-bordered table-striped table-condensed">
      <thead>
        <tr>
          {titles.map(title => (
            <th key={title}>{title}</th>
          ))}
          <th> Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          return (
            <tr>
              {Object.values(item).map(value => {
                return <td>{value}</td>;
              })}
              <td>
                <button
                  onClick={() => {
                    history.push(`${location.pathname}/edit/${item.id}`);
                  }}
                  className="btn btn-primary btn-xs"
                >
                  <i className="fa fa-pencil"></i>
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger btn-xs"
                >
                  <i className="fa fa-trash-o "></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
