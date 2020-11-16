import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header(props) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  }
  return (
    <div>
      <nav>
        <Link to="/hk7webadvmidtermclient">
          <h1 className="Logo">AnotherRetro</h1>
        </Link>
        <ul className="nav-links">
          <Link to="/dashboard">
            <li>
              <FontAwesomeIcon icon={faColumns} size="2x" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
              <span>Trang cá nhân</span>
            </li>
          </Link>
          <Link to="/login" onClick={handleLogout}>
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
              <span>Đăng xuất</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
