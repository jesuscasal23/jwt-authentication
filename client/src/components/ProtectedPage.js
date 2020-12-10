import React from "react";
import { connect } from "react-redux";
import { getList } from "../redux/action";

const ProtectedPage = (props) => {
  const handleClick = () => {
    const token = props.authenticated;
    props.getList(token, () => {
      props.history.push("/login");
    });
  };
  return (
    <div>
      <h1>this is a protected ProtectedPage</h1>
      <button onClick={() => handleClick()}>get the protected resource</button>
      {props.list.map((e) => {
        return <p key={e}>- {e}</p>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { list: state.list, authenticated: state.authenticated };
};

const mapDispatchToProps = {
  getList: getList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedPage);
