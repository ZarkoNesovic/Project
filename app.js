var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/KSS1', {useNewUrlParser: true,useUnifiedTopology: true});
const MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser')

var passport=require('passport');
var flash=require('connect-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter=require('./routes/register');
var testRouter=require('./routes/test');
var channelRouter=require('./routes/channel');
var accountRouter=require('./routes/account');
var loginRouter=require('./routes/login')

var app = express();

require('./db/passport')(passport);
//module.exports=passport;



// view engine setup
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
var bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,    
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/test',testRouter);
app.use('/channel',channelRouter);
app.use('/account',accountRouter);
app.use('/login',loginRouter)

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
