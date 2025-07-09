const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');


/* GET home page. */
router.get('/', requireLogin, (req,res) => {
  res.render('index',{
    step1: true,
    step2: false,
    todayMessage: null
  });
});

module.exports = router;
