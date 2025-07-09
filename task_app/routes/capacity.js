const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');


router.get('/',requireLogin,(req,res)=>{
  const redirectTo = req.query.redirect || '/';
  res.render('capacity',{
    redirect: redirectTo
  });
});

router.post('/capacity',(req,res)=>{
  const redirectTo = req.body.redirect || '/';

  const cond1 = parseInt(req.body["physical-condition1"], 10);
  const cond2 = parseInt(req.body["physical-condition2"], 10);
  const cond3 = parseInt(req.body["physical-condition3"], 10);

  const sum = cond1 + cond2 + cond3;
  const normalized = (sum - 3) / 12;
  let capacity = Math.round(normalized * 99 + 1);
  capacity = Math.max(1, Math.min(100, capacity));

  db.prepare('UPDATE users SET capacity = ? WHERE id = ?').run(capacity, req.session.userId);

  // メッセージを生成
  let capacityMessage = '';
  if (capacity >= 81) {
    capacityMessage = '今日はすごく調子が良さそう。やりたいことを楽しんでね！';
  } else if (capacity >= 61) {
    capacityMessage = '今日は余裕がありそう。無理なく進めてみよう。';
  } else if (capacity >= 41) {
    capacityMessage = 'ちょっとお疲れ気味かな？ペースを落として大丈夫だよ。';
  } else if (capacity >= 21) {
    capacityMessage = 'だいぶ疲れがたまってるかも。大事にしてね。';
  } else {
    capacityMessage = '今日はしっかり休もう。何もしない時間も大切だよ。';
  }

  // セッションに保存
  req.session.capacity = capacityMessage;

  req.session.save(()=>{
    res.redirect(redirectTo);
  })
});


module.exports = router;