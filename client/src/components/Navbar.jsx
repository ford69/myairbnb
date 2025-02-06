import React from "react";
import { IconButton } from "@mui/material";
import { Person, Search, Menu } from "@mui/icons-material";
import variable from "../styles/variables.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Navbar.scss";

export const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
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

        <button className="navbar_right_account">
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
      </div>
    </div>
  );
};
