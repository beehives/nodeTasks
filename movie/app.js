var express=require("express");
var path=require("path");

var mongoose=require("mongoose");

var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var session=require("express-session");
//用来存储会话，帮会话存储在Mongodb中
var mongoStore=require("connect-mongo")(session);


var port=process.env.PORT||3000;
var app=express();



mongoose.Promise = global.Promise;  
mongoose.connect("mongodb://localhost/longrui");

app.use(express.static(path.join(__dirname,'public')));

//引入文件上传处理的中间件
app.use(require('connect-multiparty')());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret:"imooc",
  store:new mongoStore({
    url:"mongodb://localhost/longrui",
    collection:"sessions"
  })
}));
//ico设置
app.use(require("serve-favicon")('./public/images/long.ico'));
app.set("views","./app/views/page");
app.set("view engine","jade");

app.locals.monent=require("moment");
app.listen(port);
console.log('imooc start in port'+port);

//设置开发环境下的日志，输出类型，url,以及状态
//以及数据库的日志
if(app.get("env")==="development"){
  app.use(require("morgan")(":method:url:status"));
  mongoose.set("debug",true);
}

require("./config/router.js")(app);