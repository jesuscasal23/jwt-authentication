const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 8000;
const accessTokenSecret = "youraccesstokensecret";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // for simplification there is only one user
  // here you would reach out for the database and check for the corresponding user

  if (username === "jesus" && password === "password") {
    // Generate an access token
    const accessToken = jwt.sign({ username: username }, accessTokenSecret);

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
