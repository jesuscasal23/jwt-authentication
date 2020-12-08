import React from "react";
import { Button } from "@material-ui/core";
import { logOut } from "../redux/action";
import { connect } from "react-redux";

const LogoutPage = (props) => {
  const handleClick = (e) => {
    props.logOutAction();
  };
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={(e) => handleClick(e)}
    >
      Logout
    </Button>
  );
};

const mapDispatchToProps = {
  logOutAction: logOut,
};

export default connect(null, mapDispatchToProps)(LogoutPage);
