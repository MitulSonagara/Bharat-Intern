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

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.json({ success: false, message: err });
        }

        if (!user) {
            return res.json({ success: false, message: 'Username or password incorrect' });
        }

        req.logIn(user, { session: false }, (err) => {
            if (err) {
                return res.json({ success: false, message: 'Authentication failed' });
            }

            const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '24h' });

            return res.json({ success: true, message: 'Authentication successful', token: token });
        });
    })(req, res, next);
});


module.exports = router;
