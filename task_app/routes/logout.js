const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  req.session.loginName = undefined;
  res.redirect('/');
  console.log(req.session);
});

module.exports = router;