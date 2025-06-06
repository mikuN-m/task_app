let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
  res.render('task');
});

router.get('/task-add', (req,res) => {
  res.render('task-add');
});

module.exports = router;