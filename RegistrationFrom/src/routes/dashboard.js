const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect('/login');
  }
};

// Assuming you have a dashboard page
router.get('/dashboard',(req, res) => {
  res.render('dashboard');
});

module.exports = router;
