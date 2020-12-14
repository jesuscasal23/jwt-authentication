const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
const port = 8000;
const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "refreshToken";
const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  // check if user exists
  if (req.body.email === "j" && req.body.password === "p") {
    const accessToken = jwt.sign({ email: req.body.email }, accessTokenSecret, {
      expiresIn: "3000",
    });

    //create refresh token
    const refreshToken = jwt.sign({ id: 23061997 }, refreshTokenSecret, {
      expiresIn: "1h",
    });
    // send refresh-token in cookie
    res.cookie("token", refreshToken, {
      httpOnly: true,
    });

    // send jwt-token
    res.status(200).json({
      accessToken,
    });
  } else {
    throw new Error("something went wrong");
  }
});

app.get("/protected", (req, res) => {
  // get the jwt and check its validity
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  // get the cookie and check its validity
  const refreshCookie = req.cookies.token;

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    res.status(200).json({
      list: ["hey", "this", "is", "a", "list"],
    });
  } catch (e) {
    res.status(401).json({
      error: "no valid token or your token expired",
    });
  }
});

// refresh route
app.get("/refreshToken", (req, res) => {
  const rawToken = req.headers.cookie;
  const refreshToken = rawToken.split("=")[1];
  const decoded = jwt.verify(refreshToken, refreshTokenSecret);
  const accessToken = jwt.sign({ email: req.body.email }, accessTokenSecret, {
    expiresIn: "10000",
  });
  if (decoded) {
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401).json({
      error: "no valid token or your token expired",
    });
  }
});

// these routes have to be deleted later on
app.get("/cookie", (req, res) => {
  const refreshToken = jwt.sign({ id: 23061997 }, refreshTokenSecret, {
    expiresIn: "1h",
  });
  // send refresh-token in cookie
  res.cookie("token", refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({
    msg: "i sent you a cookie",
    cookie: refreshToken,
  });
});

app.get("/onlyWithCookie", (req, res) => {
  const rawToken = req.headers.cookie;
  const token = rawToken.split("=")[1];
  const decoded = jwt.verify(token, refreshTokenSecret);
  res.status(200).json({
    msg: "it worked",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
