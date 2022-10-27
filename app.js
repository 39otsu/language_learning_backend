const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const index = require('./routes/index')
const dir = require('./routes/directory');
const count = require('./routes/count');
const rando = require('./routes/rand');
const word = require('./routes/word');
const rank = require('./routes/rank');
const search = require('./routes/search');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', index);
app.use('/dir', dir);
app.use('/count', count);
app.use('/rand', rando);
app.use('/w', word);
app.use('/r', rank)
app.use('/s', search)

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
