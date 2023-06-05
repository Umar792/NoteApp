import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../ContextApi/Context/UserContext";
import "./Header.css";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout, Authanticated } = UseUserContext();
  const navigate = useNavigate();
  const logoutcall = () => {
    logout();
    navigate("/");
    toast.success("logout Successfuly", {
      theme: "dark",
    });
  };
  return (
    <div className="Home">
      {/* ------------ left  */}
      <div className="left_home">
        <NavLink to="/">
          <h1>
            Your<font>Note</font>
          </h1>
        </NavLink>
      </div>
      {/* ------------ right  */}
      {!Authanticated ? (
        <div className="right_home">
          <ul>
            <NavLink to="/login">
              <li>Sign In</li>
            </NavLink>
            <NavLink to="/signup">
              <li>Sign Up</li>
            </NavLink>
          </ul>
        </div>
      ) : (
        <div className="flex justify-center align-middle">
          <NavLink to="/profile" className="username">
            {user.username && user.username.slice(0, 1)}
          </NavLink>
          <button className="logout" onClick={logoutcall}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
