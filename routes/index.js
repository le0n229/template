const express = require('express');
const Users = require('../models/clients');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Super Sport', user: req.session.user });
});

router.post('/login', async (req, res) => {
  const userName = req.body.username;
  const { password } = req.body;

  const user = await Users.findOne({ userName });
  if (!user) {
    res.redirect('/login');
  } else if (user.password !== password) {
    res.redirect('/login');
  } else {
    req.session.user = user;
    if (req.session.user.role === 'courier') {
      res.redirect('/courier');
    } else if (req.session.user.role === 'admin') {
      res.redirect('/admins');
    } else {
      res.redirect('/users');
    }
  }
});


router.get('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/users');
  }
  res.render('login', { user: req.session.user });
});


router.post('/signup', async (req, res, next) => {
  try {
    const user = new Users({
      userName: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { user: req.session.user });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
