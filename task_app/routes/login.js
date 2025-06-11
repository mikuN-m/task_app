const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');

router.get('/',(req,res)=>{
  res.render('login',{
    loginError: null,
    signInError: null
  });
});

router.post('/login-post', (req, res) => {
  const userName = req.body.userName;
  const userId = req.body.userId;

  const test = db.prepare('select * from users').all();

  console.log(test,userName,userId);

  res.redirect('/');
});

module.exports = router;