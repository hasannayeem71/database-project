const express = require("express");
const bodyParser = require("body-parser");
const userinfo = require("./routes/userinfo");
const con = require("./connection");
const app = express();
const cors = require("cors");

// midleware
app.use(bodyParser.json());
app.use(cors());
app.use("/userinfo", userinfo);

app.listen(5000);
