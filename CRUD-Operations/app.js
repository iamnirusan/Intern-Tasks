const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Files
app.use(express.static("public"));

// Register custom helpers for Handlebars
const handlebars = exphbs.create({
  extname: ".hbs",
  helpers: {
    gt: (a, b) => a > b, // greater than helper
    lt: (a, b) => a < b, // less than helper
    add: (a, b) => a + b, // addition helper
    subtract: (a, b) => a - b, // subtraction helper
  },
});

// Template Engine
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

const routes = require("./server/routes/products");
app.use("/", routes);

// Listen Port
app.listen(port, () => {
  console.log("Listening Port : " + port);
});
