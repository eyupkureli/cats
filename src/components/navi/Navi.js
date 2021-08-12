import React, { useState } from "react";   //navi
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";

const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Christmas Cats</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavLink href = "/upload">Upload Image</NavLink>
          <NavLink href = "/favs">See My Fav Cats</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
