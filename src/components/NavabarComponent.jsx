import React from "react";
import SearchForm from "../elements/SearchForm";
import Avatar from "../elements/Avatar";
import { Menu } from "../constant";

const NavbarComponent = ({ handleHamburgerClick }) => {
  return (
    <nav className="nav-container">
      <div className="hamburger-menu" onClick={handleHamburgerClick}>
        <Menu />
      </div>
      <SearchForm />
      <Avatar />
    </nav>
  );
};

export default NavbarComponent;
