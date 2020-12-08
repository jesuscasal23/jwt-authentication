const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8000;
const accessTokenSecret = "youraccesstokensecret";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  // for simplification there is only one user
  // here you would reach out for the database and check for the corresponding user
  if (req.body.email === "jesus" && req.body.password === "password") {
    // Generate an access token
    const accessToken = jwt.sign({ email: req.body.email }, accessTokenSecret);
    res.json({
      accessToken,
    });
  } else {
    throw new Error("something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
