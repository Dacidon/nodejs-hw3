const express = require('express')
const db = require('../db');
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page', msglogin: req.flash('loginmsg')[0] })
})

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('loginmsg', 'Не все поля заполнены');
    res.redirect('/login');
  } else if (!db.get('admins').find({ adminEmail: email}) || password !== db.get('admins').find({ adminEmail: email}).value().adminPass ) {
    req.flash('loginmsg', 'Неверный логин или пароль');
    res.redirect('/login');
  } else {
    res.redirect('/admin');
  }
  console.log('Flash: ', req.flash('loginmsg'));
})

module.exports = router
