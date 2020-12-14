import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getList, refreshToken } from "../redux/action";

const ProtectedPage = (props) => {
  const [timer, setTimer] = useState(10);

  const handleClick = () => {
    const token = props.authenticated;
    props.getList(token, props.history);
  };

  useEffect(() => {
    setTimeout(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  });

  return (
    <div>
      <h1>this is a protected ProtectedPage</h1>
      <button onClick={() => handleClick()}>get the protected resource</button>
      <button onClick={() => props.refreshToken()}>refresh Token</button>
      {props.list.map((e) => {
        return <p key={e}>- {e}</p>;
      })}
      <p>{timer}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { list: state.list, authenticated: state.authenticated };
};

const mapDispatchToProps = {
  getList: getList,
  refreshToken: refreshToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedPage);
