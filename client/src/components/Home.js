import Axios from "axios";
import React from "react";
export default function Home() {
  const getCookie = async () => {
    Axios.defaults.withCredentials = true;
    const response = await Axios.get("http://localhost:8000/cookie");
    console.log(response.data);
  };

  const getResourceWithCookie = async () => {
    const response = await Axios.get("http://localhost:8000/onlyWithCookie");
    console.log(response.data);
  };

  return (
    <div>
      <h2>authorization using http-only cookie</h2>
      <button onClick={(e) => getCookie()}>
        this button is used to get a cookie
      </button>
      <button onClick={(e) => getResourceWithCookie()}>
        this tries to get resources with your cookie
      </button>
    </div>
  );
}
