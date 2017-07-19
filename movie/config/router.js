var Index=require("../app/controlls/index");
var Movie=require("../app/controlls/movie_router");
var User=require("../app/controlls/user_router");
var Comment=require("../app/controlls/comment");
var Category=require("../app/controlls/category");

module.exports=function(app){
//把user设置成全局的,app.use()使用中间件，在发生请求的时候，都会执行一次
app.use(function(req,res,next){
  var _user=req.session.user;
  //这里不用if判断是否_user存在后，在赋值，所以若被清除req.session.user
  //所以赋值app.locals.user=null
  app.locals.user=_user;
  next();
});


  //index page 
app.get("/",Index.home);

//movie
// detail page
app.get("/movie/:id",Movie.detail);
//admin update movie
app.get("/admin/update/:id",Movie.update);

//admin post movie
app.post('/admin/movie/new',Movie.savePoster,Movie.movieR);

//admin page
app.get("/admin/movie",User.signRequest,User.adminRequest,Movie.movieN);

//list page
app.get("/admin/list",User.signRequest,User.adminRequest,Movie.moivelist);
//list delete
app.delete("/admin/list/:id",Movie.moviedelte);

//处理注册的路由
//原有视屏中写的是find()返回的是一个集合，所以会报错
//这里应该使用fineOne()，如果存在，则重定向返回主界面
//user
app.post("/user/signup",User.singup);

// //userlist page
app.get("/admin/userlist",User.signRequest,User.adminRequest,User.userlist);

//signin 登录
app.post("/user/signin",User.signin);

//退出路由
app.get("/loginout",User.singout);

//专门的signup页面
app.get("/signup",User.showup);

//专门的signup页面
app.get("/signin",User.showin);

//comment
app.post("/movie/user/comment",User.signRequest,Comment.save);


//分类路由的处理
//分类录入页
app.get("/admin/category/new",User.signRequest,User.adminRequest,Category.news);
//分类录入的保存
app.post("/admin/category",User.signRequest,User.adminRequest,Category.save);
//分类的展示
app.get("/category/list",User.signRequest,User.adminRequest,Category.list);

//分页的路由
app.get("/result",Index.pages);
}