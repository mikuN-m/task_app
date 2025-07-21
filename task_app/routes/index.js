const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');


/* GET home page. */
router.get('/', requireLogin, (req,res) => {
  res.render('index', {
    capa: req.session.capacity,
    capaMes: req.session.capacityMessage,
    taskMes: null
  });
});


module.exports = router;
