import React, { useState } from "react";
import { connect } from "react-redux";
import { InputLabel, Input } from "@material-ui/core";
import { submitEmailPassword } from "../redux/action";
import styled from "@emotion/styled";
import { buttonStyles, center, inputStyles } from "./styles";

const Form = styled.form`
  margin: 0 auto;
  width: 60%;
  textalign: center;
`;

const LoginPage = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.logInAction({
      email: data.email,
      password: data.password,
      history: props.history,
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
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h3 style={center}>this is the login page</h3>
        <InputLabel style={center}>email</InputLabel>
        <Input
          style={inputStyles}
          name="email"
          type="text"
          value={data.email}
          onChange={(e) => handleChange(e)}
        ></Input>
        <InputLabel style={center}>password</InputLabel>
        <Input
          style={inputStyles}
          name="password"
          type="password"
          value={data.password}
          onChange={(e) => handleChange(e)}
        ></Input>
        <div style={center}>
          <button type="submit" style={buttonStyles}>
            Login
          </button>
        </div>
        {props.authError ? <div>there was an error</div> : null}
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  logInAction: submitEmailPassword,
};

const mapStateToProps = (state) => {
  return { authError: state.authError };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
