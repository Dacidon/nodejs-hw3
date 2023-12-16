const express = require('express')
const router = express.Router()
const db = require('../db');

router.get('/', (req, res, next) => {
  db.get('skills').push({
    "number": 98,
    "text": "test"
  }).write();
  const products = db.get('products').value();
  const skills = db.get('skills').value();
  res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('message')[0]})
})

router.post('/', (req, res, next) => {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    req.flash('message', 'не все поля заполнены');
  } else {
    req.flash('message', 'Письмо отправлено!');
  }

  res.redirect('/');
})

module.exports = router
