const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mainRoute = require("./routes/main")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
 
app.use("", mainRoute);

app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials("views/partials");

app.listen(4000, () => {
    console.log("Server started on port 4000")
})