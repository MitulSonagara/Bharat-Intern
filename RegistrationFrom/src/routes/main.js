const express = require("express");
const hbs = require("hbs")
const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("index",{ showSignup: true })
})

routes.get("/signup", (req, res) => {
    res.render("index",{ showSignup: true })
})

routes.get("/login", (req, res) => {
    res.render("index",{ showSignup: false })
})

module.exports = routes;