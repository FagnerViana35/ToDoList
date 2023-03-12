import React from "react";
import "./index.scss";


const Navbar = () => {
  return (
    <nav>
      <a href="#" className="navbar-brand">
        ToDo List
      </a>
      <ul className="navbar-items">
        <li>
          <a href="#">Início</a>
        </li>
        <li>
          <a href="#">Sobre</a>
        </li>
        <li>
          <a href="#">Contato</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;