const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');

router.get('/',requireLogin,(req,res)=>{
  const task = db.prepare('select * from tasks where userId = ? and isFixed = ?').all(req.session.userId,0);
  const fixedTask = db.prepare('select * from tasks where userId = ? and isFixed = ?').all(req.session.userId,1);

  res.render('task',{
    task: task,
    fixedTask: fixedTask
  });
});

router.post('/task-add',(req,res) => {
  const {
    taskName,
    category,
    priority,
    fatigue,
    memo
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO tasks (userId, name, fatigue, isFixed, priority, category, memo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(req.session.userId, taskName, fatigue, 0, priority, category, memo);

  res.redirect('/task');
});

router.post('/task-Fixed-add',(req,res) => {
  const {
    taskName,
    category,
    priority,
    fatigue,
    memo
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO tasks (userId, name, fatigue, isFixed, priority, category, memo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(req.session.userId, taskName, fatigue, 1, priority, category, memo);

  res.redirect('/task');
});


module.exports = router;