var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var base64url = require('base64url');
var crypto = require('crypto');
var moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// const HOST = 'http://ec2-52-80-209-215.cn-north-1.compute.amazonaws.com.cn:8082'
// const HOST = 'http://192.168.12.251:3008'
const HOST = 'http://ec2-54-223-118-212.cn-north-1.compute.amazonaws.com.cn:3008'
const BizHOST = 'http://ec2-54-223-118-212.cn-north-1.compute.amazonaws.com.cn:8090'
const CRMHOST = 'http://ec2-54-223-118-212.cn-north-1.compute.amazonaws.com.cn:8030'
// const CRMHOST = 'http://192.168.13.233:8030'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    rolling:true,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {maxAge: 1800000 },  //设置maxAge是1800000ms，即30mins后session和相应的cookie失效过期
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

function hmacSHA1(token, secret, date, method, url) {
    let signString = date + method + url;
    let sign = crypto.createHmac('sha1', secret).update(signString).digest().toString('base64');
    let auth = "token="+token+"&signature="+sign;
    let result = base64url(auth);

    return result;
}

app.post('/login',(req, res) => {
  const form = {'email':req.body.email,'password':req.body.password}
  request.post({
      url: `${HOST}/api/user/login`,
      form : form,
      headers: {
        'PROJECT-NAME': 'CRM'
      }
  }, (err, resp, data) => {
    if(resp && resp.body) {
      const body = JSON.parse(resp.body)
      const code  = body.code
      let result = {}
      if (code === 1) {
        const token = body.result.token
        const tokenSecret = body.result.tokenSecret
        let sign = {'token': token, 'tokenSecret':tokenSecret}
        req.session.sign = sign
        data = JSON.parse(data)
        result.email = data.result.email
        result.id = data.result.id
        result.region = data.result.region
        result.roles = data.result.roles
        result.imgUrl = data.result.imgUrl
      }
      res.json({code: code,msg: data.msg,result: result})
    }
    if(err) {
      res.json({code:err.code, msg:'Server Error: ' + err.errno})
    }
    })
})

app.get('/list',(req,res,next) => {
  const sign = req.session.sign
  if(sign) {
    let date = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    let url = '/api/menu/list'
    let text = hmacSHA1(sign.token,sign.tokenSecret,date,'GET', url)
    request.get({
      url: `${HOST}/api/menu/list`,
      headers: {
        'PROJECT-NAME': 'CRM',
        'X-Oriente-Date': date,
        'Authorization': text,
        'USERID': 1
      }
    }, (err, resp, data) => {
      if(resp && resp.body) {
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({code: body.code, msg: body.msg, result: body.result})
      }
      if(err) {
        res.json({code:err.code, msg:'Server Error: ' + err.errno})
      }
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})
app.get('/webapi/*', (req, res, next) => {
  if(req.session.sign) {
    request.get({
      url: `${BizHOST}/${req.originalUrl}`,
      headers: req.headers
    }, (err, resp, data) => {
      if(resp&&resp.body){
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({code: code, msg: body.msg, data: body.data})
      }
      if(err) {
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
      
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})

app.post('/webapi/*',(req, res, next) => {
  if(req.session.sign) {
    request.post({
      url: `${BizHOST}/${req.originalUrl}`,
      headers: req.headers,
      form: req.body
    },(err, resp, data) => {
      if(resp && resp.body) {
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({code: code, msg: body.msg, data: body.data})
      }
      if(err) {
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
      
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})
app.delete('/webapi/*',(req,res,next) => {
  if(req.session.sign) {
    request.del({
      url: `${BizHOST}/${req.originalUrl}`,
      headers: req.headers
    },(err, resp, data) => {
      if(resp && resp.body){
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({code: code, msg: body.msg, data: body.data})
      }
      if(err) {
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})
app.get('/api/*',(req,res,next) => {
  const sign = req.session.sign
  console.log(123,sign)
  if(sign) {
    let date = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    let url = req.originalUrl
    let text = hmacSHA1(sign.token,sign.tokenSecret,date,'POST', url)
    request.get({
      url:`${CRMHOST}/${req.originalUrl}`,
      headers: {
        'PROJECT-NAME': 'CRM',
        'X-Oriente-Date': date,
        'Authorization': text,
        'USERID': 1
      }
    },(err,resp,data) => {
      if(resp && resp.body){
        const body = JSON.parse(resp.body)
        const code = body.code
        const result = body.result
        const msg = body.msg
        res.json({code:code, msg:msg, data:result})
      }
      if(err){
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
    })
  } else {
    res.json({code:-13,msg:'User information has expired, please login again!'})
  }
})
app.post('/api/*',(req, res, next) => {
  const sign = req.session.sign
  if(sign) {
    let date = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    let url = req.originalUrl
    let text = hmacSHA1(sign.token,sign.tokenSecret,date,'POST', url)
    request.post({
      url:`${CRMHOST}/${req.originalUrl}`,
      form: req.body,
      headers: {
        'PROJECT-NAME': 'CRM',
        'X-Oriente-Date': date,
        'Authorization': text,
        'USERID': 1
      }
    },(err, resp,data) => {
      if(resp && resp.body){
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({ code:code ,msg: body.msg, data: body.result})
      }
      if(err){
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})
app.put('/api/*',(req,res,next) => {
  const sign = req.session.sign
  if(sign) {
    let date = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    let url = req.originalUrl
    let text = hmacSHA1(sign.token,sign.tokenSecret,date,'PUT', url)
    request.put({
      url:`${CRMHOST}/${req.originalUrl}`,
      headers: {
        'PROJECT-NAME': 'CRM',
        'X-Oriente-Date': date,
        'Authorization': text,
        'USERID': 1
      },
      form: req.body
    },(err, resp,data) => {
      if(resp && resp.body) {
        const body = JSON.parse(resp.body)
        const code = body.code
        res.json({ code:code ,msg: body.msg, data: body.result})
      }
      if(err){
        res.json({code:err.code, msg:'Server Error ' + err.errno})
      }
    })
  } else {
    res.json({code: -13, msg: 'User information has expired, please login again!'})
  }
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
