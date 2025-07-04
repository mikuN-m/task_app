const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');


/* GET home page. */
router.get('/', requireLogin, (req,res) => {
  res.render('index');
});

router.post('/capacity', (req,res) => {
  const capacity = req.body.capacity;

  db.prepare('update users set capacity = ? where id = ?').run(capacity,req.session.userId);

  req.session.capacity = capacity;
  req.session.save(()=>{
    res.redirect('/');
  });
});

module.exports = router;
