const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./view"));

app.get("/", (_req, res, _next) => {
    res.render("index.html");
})

module.exports = app;