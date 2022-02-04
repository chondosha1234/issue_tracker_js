const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParse = require("body-parser"); //my addition
const auth = require("./utils/auth"); //my addition

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//const crudRouter = require('./routes/crud-route');  // my addition
const router = require('./routes/routes'); //my addition

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

auth.initialization(app); //my addition

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/crud', crudRouter);  //my addition
app.use('/', router);  //my addition
//app.use('/', mainRouter);
//app.use('/issues', issueRouter);
//app.use('/projects', projectRouter);


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
