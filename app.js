const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mariadb = require("mariadb");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./view"));

app.get("/", (_req, res, _next) => {
  res.render("index.html");
});

app.use("/test", require("./routes/test"));
app.use("/location", require("./routes/location"));
app.use("/form", require("./routes/form"));
app.use("/signal", require("./routes/signal"))

module.exports = app;
