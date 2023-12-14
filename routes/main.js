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
  res.render('pages/index', { title: 'Main page', products, skills})
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  res.send('Реализовать функционал отправки письма')
})

module.exports = router
