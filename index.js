const express = require("express");
const port = 4000;
const app = express();
var bodyParser = require('body-parser');
const axios = require("axios");
const login = require("./routes/login");
const register = require("./routes/register");

const clientID = "8bdb3b74fd90dd6a83b8";
const clientSecret = "a11197c18088d7cc84c79c4871c448c58b6dff8c";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const router = express.Router();

router.get("/", function(req, res) {
  res.send("Connected!");
});

router.post("/register", register.register);
router.post("/login", login.login);
app.use("/api", router);

app.listen(port, () => {
  console.log("The server is listening on port " + port);
});

// app.get("/results", (req, res) => {
//   dbPool.query("select * from users;", (error, results, fields) => {
//     if (error) throw error;
//      console.log(res.json());
//     res.send({ data: results });
//   });
// });

app.get("/oauth/redirect", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    const accessToken = response.data.access_token;
    res.redirect(`/welcome.html?access_token=${accessToken}`);
  });
});
