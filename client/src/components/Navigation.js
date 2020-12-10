import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Navigation(props) {
  const authenticated = props.authenticated;
  const NavigationContainer = styled.div`
    display: flex;
    background-color: ${authenticated ? "green" : "black"};
    padding: 0;
    justify-content: space-around;
  `;

  const LinkStyles = {
    color: "white",
    padding: "5px",
  };

  return (
    <NavigationContainer>
      <Link style={LinkStyles} to="/">
        Home
      </Link>
      <Link style={LinkStyles} to="/Login">
        Login
      </Link>
      <Link style={LinkStyles} to="/Logout">
        Logout
      </Link>
      <Link style={LinkStyles} to="/protected">
        Protected
      </Link>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return { authenticated: state.authenticated };
};

export default connect(mapStateToProps, null)(Navigation);
