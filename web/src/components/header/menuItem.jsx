import React from "react";

const MenuItem = ({ className, title, url, children }) => {
  const SubMenu = ({ children }) => {
    return (
      <ul>
        {children.map(child => {
          return (
            <li key={child.id}>
              <a href={child.url}>{child.title}</a>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <li className={className}>
      <a href={url}>{title}</a>
      {children.length > 0 ? <SubMenu children={children} /> : ""}
    </li>
  );
};

export default MenuItem;
