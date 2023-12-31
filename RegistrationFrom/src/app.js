const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const mainRoute = require('./routes/main');
const signupRoute = require('./routes/signup');
// const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');
const User = require('./models/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use(
  session({
    secret: 'my-secreysfa-mjiadfsn',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials('views/partials');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('', mainRoute);
app.use('', signupRoute);
// app.use('', loginRoute);
app.use('', dashboardRoute);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RegistrationForm');
  console.log('Database connected');
}

app.listen(4040, () => {
  console.log('Server started on port 4000');
});
 