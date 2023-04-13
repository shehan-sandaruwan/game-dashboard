import React from "react";
import SearchForm from "../elements/SearchForm";
import Avatar from "../elements/Avatar";

const NavbarComponent = () => {
  return (
    <nav className="nav-container">
      <SearchForm />
      <Avatar />
    </nav>
  );
};

export default NavbarComponent;
