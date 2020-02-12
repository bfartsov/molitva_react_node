import React from "react";
import "../css/table-responsive.css";

const Table = ({ titles, items, handleDelete, handleEdit }) => {
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
                <button onClick={handleEdit} className="btn btn-primary btn-xs">
                  <i id={item.title} className="fa fa-pencil"></i>
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
