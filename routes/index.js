var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

// GET home page
router.get('/', function(request, response, next) {
  response.render('index', { id: request.session.userId });
});

// GET home page
router.get('/home', auth.isNotLoggedIn, function(request, response, next) {
  db.findUserById(request.session.userId).then(function(user) {
    response.render('home', { user: user });
  });
});

// GET login page
router.get('/login', auth.isLoggedIn, function(request, response, next) {
  response.render('auth/login');
});

// GET sign up page
router.get('/signup', auth.isLoggedIn, function(request, response, next) {
  response.render('auth/signup');
});

// POST credentials to login page
router.post('/login', auth.isLoggedIn, function(request, response, next) {
  auth.passport.authenticate('local', function(err, user, info) {
    if (err) {
      response.render('auth/login', { error: err });
    } else if (user) {
      request.session.userId = user.id;
      response.redirect('/home');
    }
  })(request, response, next);
});

// POST credentials to signup page
router.post('/signup', auth.isLoggedIn, function(request, response, next) {
  db.findUserByUsername(request.body.username).then(function(user) {
    if (user) {
      response.render('auth/signup', { error: 'Username already exists' });
    } else {
      auth.createUser(request.body).then(function(id) {
        request.session.userId = id;
        response.redirect('/home');
      });
    }
  }).catch(function(err) {
    next(err);
  });
});

// Logout route
router.get('/logout', function(request, response, next) {
  request.session = null;
  response.redirect('/');
});


module.exports = router;
