let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
  res.render('task',{errMsg:null});
});

router.get('/task-add', (req,res) => {
  const errMsg = 'ログインしてください';
  if (req.session.loginName == undefined) {
    res.render('task',{errMsg:errMsg});
  } else {
    res.render('task-add');
  }
});

module.exports = router;