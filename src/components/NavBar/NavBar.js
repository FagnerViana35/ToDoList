import React from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/apiActions";
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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
          <button className="logout" onClick={handleLogout}><FiLogOut /> Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;