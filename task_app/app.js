const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const sassMiddleware = require('sass-middleware');


const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const capacityRouter = require('./routes/capacity');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  sassMiddleware({
    /* ソースのSCSSファイルがある場所 */
    src: path.join(__dirname, 'public', 'stylesheets'),
    /* コンパイルされたCSSファイルの出力先 */
    dest: path.join(__dirname, 'public', 'stylesheets'),
    /* 出力ファイルのURLパス */
    prefix: '/stylesheets',
    indentedSyntax: false, // trueだと.sass、falseだと.scss
    sourceMap: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//sessionの管理
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60 * 60 * 1000 }
}));

app.use((req,res,next) => {

  //ログイン管理
  if (req.session.loginName == undefined) {
    res.locals.login = false;
    res.locals.loginName ='ゲスト';
    res.locals.id = '';
    res.locals.capacity = '';
    
  } else {
    res.locals.login = true;
    res.locals.loginName = req.session.loginName;
    res.locals.id = req.session.userId;
    res.locals.capacity = req.session.capacity;
  }

  next();
});

app.use('/', indexRouter);
app.use('/task', taskRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/capacity', capacityRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;