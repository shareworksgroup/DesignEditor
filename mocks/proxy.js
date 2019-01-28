const express = require('express')
let _request = require('request');
var cors = require('cors');
const fs = require('fs');
const app = express()
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');  
var map = require('./data.js');
var UrlPattern = require('url-pattern');
app.use(cookieParser());  
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('../staticLocal'));
var cheerio = require('cheerio');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
if (process.argv.length < 4) {
  throw new Error('you need to provide user info');
}
const USERNAME = process.argv[2];
const PASSWORD = process.argv[3];
console.log(PASSWORD)
const allowCrossDomain = function (req, res, next) {
  // 自定义中间件，设置跨域需要的响应头。
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
const WEB = 'https://smsonedev.sms-assist.com';
// 运用跨域的中间件
app.use(allowCrossDomain);
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:8095'//https://design-editor-93157.firebaseapp.com', // web前端服务器地址
}));
// 记住cookie
var jar = _request.jar();
var request = _request.defaults({ jar: jar });

// 处理cookie失效重新登录
let lastTime = new Date();
const maxTime = 1000*60*10;

function login(callback){
  return new Promise(function(resolve, reject){
    console.log('================== start login...... ========================');
    request.get(WEB+'/Account/Login', function(err, response, data){
      var $ = cheerio.load(data);
      request.post(WEB+'/Account/Login', {form: {
        userName: USERNAME,
        password: PASSWORD,
        utcOffset: -480,
        isSupportDST: false,
        rememberMe: false,
        isMobile: false,
        __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
      }}, function (err, response , data) {
        if(err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve();
        loginPromise = null;
        console.log(data);
        console.log('================== login success ========================');
        console.log('================== proxy start successfully ========================');
      });
    })
    
  });
}
login();
let loginPromise = null;
function checkCookie(){
  return new Promise((resolve, reject) => {
    if (loginPromise) {
      return loginPromise.then(resolve);
    } else if((new Date() - lastTime) >= maxTime) {
      loginPromise = login().then(resolve);
      return loginPromise;
    } else {
      resolve();
    }
  });
}
const cookieMap = {};
function setCookie(res) {
  const cookieStr = jar.getCookieString(WEB);
  if (!cookieStr)
    return;
  if (cookieMap[cookieStr]) {
    return cookieMap[cookieStr].forEach((item) => {
      res.cookie(item.name, item.value, {domain: 'localhost', path: '/', httpOnly:false, maxAge:999999999, secure: false, signed: false});
    })
  }
  const obj = [];
  const cookieList = cookieStr.split(';').map(item => {
    const arr = item.trim().split('=');
    obj.push({name: arr[0], value: arr[1]});
    res.cookie(arr[0], arr[1], {domain: 'localhost', path: '/', httpOnly:false, maxAge:999999999, secure: false, signed: false});
  });
  cookieMap[cookieStr] = obj;
}

function filter(url){
  for(var key in map) {
    var pattern = new UrlPattern(key);
    if(pattern.match(url)) {
      var result = fs.readFileSync(map[key]) + '';
      try {
        result = JSON.parse(result);
      }catch(e){
        console.log('error', e);
      }
      if (Object.prototype.toString.call(result) === '[object Number]'){
        result += '';
      }
      return {data:result ,success:true,msg:''};
    }
  }
  return null;
}

app.get('*', function(req, res, next){
  const url = req.url;
  console.log('===================', url);
  const mockData = filter(url);
  if(mockData) {
    console.log('===========命中本地mock===========');
    res.send(mockData);
    return;
  }
  const param = {};
  for(var key in req.query) {
    param[key] = req.query[key];
  }
  checkCookie().then(() => {
    request({url: WEB + url, json: param}, function(error, response, body) {
      !req.cookies['.AspNet.ApplicationCookie'] && setCookie(res);
      lastTime = new Date();
      res.send(body);
    });
  });
  
});
app.post('*', function(req, res, next){
  const url = req.url;
  console.log('===================', url);
  const mockData = filter(url);
  if(mockData) {
    console.log('===========命中本地mock===========');
    res.send(mockData);
    return;
  }
  const contentType = req.headers['content-type'] || 'application/x-www-form-urlencoded';
  console.log(contentType);
  if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
      //能正确解析 json 格式的post参数
      console.log(req.body);
      checkCookie().then(() => {
        request.post( WEB + url, {form: req.body, headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}, function(error, response, body) {
          lastTime = new Date();
          !req.cookies['.AspNet.ApplicationCookie'] && setCookie(res);
          res.send(body);
        });
      });
     
  } else if(contentType.indexOf('application/json')!==-1){
      //不能正确解析json 格式的post参数
      var data = [], jsonStr;
      req.on('data', function (chunk) {
        data.push(chunk); //读取参数流转化为字符串
      });
      req.on('end', function () {
          const body = Buffer.concat(data);
          //读取参数流结束后将转化的body字符串解析成 JSON 格式
          try {
              jsonStr = JSON.parse(body.toString());
          } catch (err) {
              jsonStr = null;
          }
          //console.log(jsonStr);
          checkCookie().then(() => {
            console.log('************************',jsonStr, WEB + url);
            request.post( WEB + url, {json: jsonStr, headers: {
              'Content-Type': 'application/json'
            }}, function(error, response, body) {
              lastTime = new Date();
              !req.cookies['.AspNet.ApplicationCookie'] && setCookie(res);
              res.send(body);
            });
          });
      });
  } else if (contentType.indexOf('multipart/form-data') !== -1) {
      //文件上传
      var data = [], jsonStr;
      req.on('data', function (chunk) {
        data.push(chunk); //读取参数流转化为字符串
      });
      req.on('end', function () {
        const body = Buffer.concat(data);
        checkCookie().then(() => {
          request.post( WEB + url, {body : body, headers: {
            'Content-Type': contentType,
            Connection: 'keep-alive'
          }}, function(error, response, body) {
            console.log(response);
            lastTime = new Date();
            !req.cookies['.AspNet.ApplicationCookie'] && setCookie(res);
            res.send(JSON.parse(body));
          });
        });
      });
  }
});
const server = app.listen(3001, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
}) ;