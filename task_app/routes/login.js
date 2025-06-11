const express = require('express');
const router = express.Router();
const Model = require('../models/dbModel');

router.get('/',(req,res)=>{
  res.render('login',{
    loginError: null,
    signInError: null
  });
});

router.post('/login-post', (req, res) => {
  const userName = req.body.userName;
  const userId = req.body.userId;

});

module.exports = router;