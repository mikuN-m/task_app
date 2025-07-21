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

  const physicalCondition = parseInt(req.body["physical-condition1"], 10);
  const sleepQuality = parseInt(req.body["physical-condition2"], 10);
  const mood = parseInt(req.body["physical-condition3"], 10);

  const totalScore = (physicalCondition * 0.4) + (sleepQuality * 0.3) + (mood * 0.3);
  const normalized = (totalScore - 1) / (5 - 1);
  const capacity = Math.round(normalized * 99 + 1);

  // メッセージを生成
  const factors = [
    { name: '体調', score: physicalCondition },
    { name: '睡眠', score: sleepQuality },
    { name: '気分', score: mood }
  ];

  const worstFactor = factors.reduce((a, b) => a.score < b.score ? a : b);
  const bestFactor  = factors.reduce((a, b) => a.score > b.score ? a : b);

  let capacityMessage = '';
  if (capacity >= 81) {
    capacityMessage = '今日はとても調子が良さそう。';
  } else if (capacity >= 61) {
    capacityMessage = '今日は余裕がありそうだね。';
  } else if (capacity >= 41) {
    capacityMessage = '少し疲れがたまっている？';
  } else if (capacity >= 21) {
    capacityMessage = '今日はだいぶしんどそう。';
  } else {
    capacityMessage = 'しっかり休んでね。';
  }

  let detailMessage = '';

  if (capacity >= 61) {
      // 良い方向
      switch(bestFactor.name) {
        case '体調':
          detailMessage = '体調が良さそうで安心だね。';
          break;
        case '睡眠':
          detailMessage = '睡眠がしっかり取れているみたいだね。';
          break;
        case '気分':
          detailMessage = '気分が前向きで素晴らしいよ。';
          break;
      }
  } else {
    // 悪い方向
    switch(worstFactor.name) {
      case '体調':
        detailMessage = '体調が少し心配だね。無理せず過ごしてね。';
        break;
      case '睡眠':
        detailMessage = '睡眠不足かも。早めに休もう。';
        break;
      case '気分':
        detailMessage = '気分が落ち込み気味かも。ゆっくり過ごしてね。';
        break;
    }
  }
  // メッセージまとめ
  const finalMessage = `${capacityMessage} ${detailMessage}`;

  // セッションに保存
  db.prepare('UPDATE users SET capacity = ? WHERE id = ?').run(capacity, req.session.userId);

  req.session.capacity = capacity;
  req.session.capacityMessage = finalMessage;

  req.session.save(()=>{
    res.redirect(redirectTo);
  });
});


module.exports = router;