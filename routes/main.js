const express = require('express')
const router = express.Router()
const db = require('../db');

router.get('/', (req, res, next) => {
  const products = db.get('products').value();
  const skills = db.get('skills').value();
  res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('message')[0]})
})

router.post('/', (req, res, next) => {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    req.flash('message', 'Не все поля заполнены');
  } else {
    db.get('messages').push({
      userEmail: email,
      userName: name,
      userMessage: message
    }).write();
    req.flash('message', 'Письмо отправлено!');
  }



  res.redirect('/');
})

module.exports = router
