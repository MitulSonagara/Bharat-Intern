const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');

// Signup Route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res, next) => {
    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
        });

        User.register(newUser, req.body.password, (err) => {
            if (err) {
                // Handle registration error
                return next(err);
            }
            // Registration successful, redirect to login page
            res.redirect(`/login`);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard',
    }),
    (req, res) => {
        console.log(req.user);
    }
);


module.exports = router;
