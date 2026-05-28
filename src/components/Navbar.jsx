import './navbar.css';
import React from "react";

const Navbar = () => {
  return (
    <nav className="navContainer">
      <div className="spanContainer">
        <span className="span1">Koin</span>
        <span className="span2">X</span>
        <sup className="sup">®</sup>
      </div>
    </nav>
  );
};

export default Navbar;
