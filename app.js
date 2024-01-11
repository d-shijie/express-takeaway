const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const accountRouter=require('./routes/account')
const ejs=require('ejs')
const cors=require('cors')
const logger=require('./middleware/logger')
const db=require('./db/index')
const authenticateJWT=require('./middleware/jwt')
const app = express();
db.sequelize.sync()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');

const corsOptions={
  origin:'*'
}
app.use(authenticateJWT)
app.use(cors(corsOptions))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  res.render('index',{title:'food'})
})
const commonPath='/api'
app.use(commonPath, usersRouter);
app.use(commonPath, accountRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

const errorHandler=(err,req,res,next)=>{
  logger.error(`${req.method} ${req.originalUrl} `+ err.message)
  const errMsg=err.message
  res.status(err.status||500).json({
    code:-1,
    success:false,
    message:errMsg,
    data:{}
  })
}
app.use(errorHandler)
module.exports = app;
