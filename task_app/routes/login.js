const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');

router.get('/',(req,res)=>{
  const redirectTo = req.query.redirect || '/';
  res.render('login',{
    loginError: null,
    signInError: null,
    redirect: redirectTo
  });
});

router.post('/login-post', (req, res) => {
  const userName = req.body.userName;
  const userPas = req.body.userPas;
  const errMsg = "このパスワード、名前は間違っています";
  const allUsers = db.prepare('select * from users').all();


  if (allUsers.some(user => user.name === userName && user.password === userPas)) {   
    const userId = db.prepare('select * from users where name = ? and password = ?').get(userName,userPas);

    req.session.userId = userId.id;
    req.session.loginName = userName;
    req.session.save(() => {
      const redirectTo = req.body.redirect || '/';
      res.redirect(redirectTo);
    });
  } else {
    res.render('login',{
      loginError: errMsg,
      signInError: null
    });
  }
});

router.post('/signIn-post', (req,res) => {
  const userName = req.body.userName;
  const userPas = req.body.userPas;
  const errMsg = "このパスワード、名前は既に使われています";
  const allUsers = db.prepare('select * from users').all();

  if (allUsers.some(user => user.name === userName || user.password === userPas)) {
    res.render('login',{
      loginError: null,
      signInError: errMsg
    });
  } else {
    db.prepare('INSERT INTO users (name, password) VALUES (?, ?)').run(userName, userPas);

    const userId = db.prepare('select * from users where name = ? and password = ?').get(userName,userPas);
    
    req.session.loginName = userName;
    req.session.userId = userId.id;
    req.session.save(() => {
      const redirectTo = req.body.redirect || '/';
      res.redirect(redirectTo);
    });
  }
});

module.exports = router;