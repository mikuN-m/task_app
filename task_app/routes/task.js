const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');

router.get('/',requireLogin,(req,res)=>{
  const AllTask = db.prepare('select * from tasks where userId = ?').all(req.session.userId);

  res.render('task',{
    errMsg:null,
    task: AllTask
  });
});

router.post('/task-add',(req,res) => {
  const userId = req.session.userId;  
  const fatigueLevel = parseInt(req.body.fatigueLevel, 10);
  const taskName = req.body.taskName;
  const category = req.body.category;
  const dueDate = req.body.dueDate;
  const dueTime = req.body.dueTime;
  const memo = req.body.memo;

  db.prepare(`
    INSERT INTO tasks (
      userId, fatigueLevel, taskName, category, dueDate, dueTime, memo
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, fatigueLevel, taskName, category, dueDate, dueTime, memo);

  res.redirect('/task');
});

router.post('/task-delete', (req,res) => {
  const selectTask = req.body.selectTask;
  console.log(req.body.selectTask);
  if (!selectTask) {
    return res.redirect('/task');
  }

  const tasks = Array.isArray(selectTask) ? selectTask : [selectTask];

  if (tasks.length > 0) {
    const placeholders = tasks.map(() => '?').join(',');
    db.prepare(`DELETE FROM tasks WHERE id IN (${placeholders})`).run(...tasks);
  }

  res.redirect('/task');
});

module.exports = router;