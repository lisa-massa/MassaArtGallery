const express = require('express');
const router = express.Router();
const User = require('../models/users');
const users = require('../controllers/users')
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const { route } = require('./artworks');

router.route('/signup')
    .get(users.renderSignUp)
    .post(catchAsync(users.signup));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;