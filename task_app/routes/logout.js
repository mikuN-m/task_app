const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  req.session.loginName = undefined;
    req.session.save(() => {
      res.redirect('/');
    });
});

module.exports = router;