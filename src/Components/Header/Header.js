import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Header() {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <nav>
      <Link to="/">
        <h3>AnotherRetro</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/login">
          <li>Log in</li>
        </Link>
        <Link to="/signup">
          <li>Sign up</li>
        </Link>
      </ul>
    </nav>
  );
}
export default Header;
