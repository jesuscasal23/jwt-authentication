import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, InputLabel, Input, FormControl } from "@material-ui/core";
import { submitEmailPassword } from "../redux/action";

const LoginPage = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    // this is not doing anything
    e.preventDefault();
    props.sendData({
      email: data.email,
      password: data.password,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <h3>this is the login page</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <InputLabel>email</InputLabel>
          <Input
            name="email"
            type="text"
            value={data.email}
            onChange={(e) => handleChange(e)}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel>password</InputLabel>
          <Input
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
          ></Input>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Primary
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (globalState) => {
  return { globalState };
};

const mapDispatchToProps = {
  sendData: submitEmailPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
