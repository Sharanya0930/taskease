import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaLock, FaSignOutAlt } from "react-icons/fa"; // Icons

const Navbar = ({ name, searchQuery, setSearchQuery, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand fw-bold" href="/">TaskEase</a>

      {/* Search Bar */}
      <form className="d-flex ms-auto">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Profile Dropdown with Avatar */}
      <div className="dropdown ms-3">
        <button
          className="btn btn-dark border-0 dropdown-toggle d-flex align-items-center"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUserCircle className="me-2" size={30} /> {/* Profile Icon */}
          <span className="fw-bold">{name || "User"}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow-lg" aria-labelledby="profileDropdown">
          <li>
            <button className="dropdown-item d-flex align-items-center" onClick={() => navigate("/change-password")}>
              <FaLock className="me-2" /> Change Password
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
