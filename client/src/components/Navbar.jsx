import React from "react";
import { IconButton } from "@mui/material";
import { Person, Search, Menu } from "@mui/icons-material";
import variable from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";


export const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch()

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/metro_prop2.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Search..." />
        <IconButton>
          <Search style={{ color: variable.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">Become A Host</a>
        ) : (
          <a href="/login" className="host">Become A Host</a>
        )}

        <button className="navbar_right_account" onClick={() => setDropdownMenu(!dropdownMenu)}>
          <Menu sx={{ color: variable.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variable.darkgrey }} />
          ) : (
            <img
              src={
                'http://localhost:3001/${user.profileImagePath.replace("public",  "")}'
              }
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {   dropdownMenu && !user && (
            <div className="navbar_right_accountmenu">
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
            </div>
        )}

        {dropdownMenu && user && (
            <div className="navbar_right_accountmenu">
                <Link to="">Trip List</Link>
                <Link to="">Wish List</Link>
                <Link to="">Property List</Link>
                <Link to="">Reservation List</Link>
                <Link to="">Become A Host</Link>

                <Link to="/login" onClick={() => {
                    dispatch(setLogout())
                }}>Log Out</Link>
            </div>
            )}
      </div>
    </div>
  );
};
