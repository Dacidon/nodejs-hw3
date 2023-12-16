const express = require('express')
const db = require('../db');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const router = express.Router()


router.get('/', (req, res, next) => {
  res.render('pages/admin', { title: 'Admin page'})
})

router.post('/skills', (req, res, next) => {
  db.get('skills').find({ text: 'Возраст начала занятий на скрипке'}).assign({number: req.body.age}).value();
  db.get('skills').find({ text: 'Концертов отыграл'}).assign({number: req.body.concerts}).value();
  db.get('skills').find({ text: 'Максимальное число городов в туре'}).assign({number: req.body.cities}).value();
  db.get('skills').find({ text: 'Лет на сцене в качестве скрипача'}).assign({number: req.body.years}).value();

  db.write();

  res.send('Значения изменены на: ' + JSON.stringify(req.body));
})

router.post('/upload', (req, res, next) => {

  const newForm = new formidable.IncomingForm();
  const upload = path.join('./', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload)
  }

  newForm.uploadDir = path.join(process.cwd(), upload);

  newForm.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }


    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/admin?msgfile=${valid.status}`);
    }

    console.log(files.photo[0].originalFilename);


    const fileName = path.join(upload, files.photo[0].originalFilename);

    
 
    fs.rename(files.photo[0].filepath, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }
 
      db.get('products').push({
        src: files.photo[0].originalFilename,
        name: fields.name[0],
        price: fields.price[0]
      }).write();
      res.redirect('/admin?msgfile=Товар успешно добавлен');
    })
  });

  

})

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена фотография товара', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано описание товара', err: true }
  }
  if (!fields.price) {
    return { status: 'Не указана цена товара', err: true }
  }
  return { status: 'Ok', err: false }
};

module.exports = router
