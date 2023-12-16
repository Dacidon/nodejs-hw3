const express = require('express')
const db = require('../db');
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.redirect('/login?msglogin=Не все поля заполнены');
  } else if (password !== db.get('admins').find({ adminEmail: email}).value().adminPass) {
    res.redirect('/login?msglogin=Неверный логин или пароль');
  } else {
    res.redirect('/admin');
  }
  console.log(password);
  console.log(db.get('admins').find({ adminEmail: email}).value().adminPass);
})

module.exports = router
