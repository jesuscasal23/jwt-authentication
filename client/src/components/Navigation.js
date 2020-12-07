import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="/Logout">Logout</Link>
      <Link to="/protected">Protected</Link>
    </div>
  );
}

export default Navigation;
