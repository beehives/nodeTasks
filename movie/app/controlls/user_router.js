var User=require("../models/user");
exports.singup=function(req,res){
    var _user=req.body.user;
     User.findOne({name:_user.name},function(err,use){
        if(err){
          console.log(err);
        }
        if(use){
          return  res.redirect("/signin");
        }else{
          var user=new User({
                  name:_user.name,
                  password:_user.password
              }).save(function(err,user){
                if(err){
                  console.log(err);
                }
                res.redirect("/admin/userlist");
              });
        }
     });    
}
exports.userlist=function(req,res){

  User.fetch(function(err,users){
       if(err){
        console.log(err);
       }
      res.render("userlist",{
        title:"用户列表页",
        users:users
     })
  })
 }
exports.signin=function(req,res){
  var _user=req.body.user;
  var _name=_user.name;
  var _password=_user.password;
  User.findOne({name:_name},function(err,user){
     if(err){
        console.log(err);
      }
      if(!user){
         return res.redirect("/signup");
      }
      user.comparePassword(_password,function(err,isMatch){
          if(err){
            console.log(err);
          }
          if(isMatch){
               req.session.user=user;
               res.redirect("/");
          }else{
               res.redirect("/signin");
          }
     });
  });
}
exports.singout=function(req,res){
      delete req.session.user;
      // delete app.locals.user;
      res.redirect("/");
}

exports.showup=function(req,res){
  res.render("signup",{
    title:"注册"
  }); 
}

exports.showin=function(req,res){
  res.render("signin",{
    title:"登录"
  }); 
}


//登录的中间件
exports.signRequest=function(req,res,next){
  var user=req.session.user;
  if(!user){
    res.redirect("/signin");
  }
  next();
}

//管理员的中间件
exports.adminRequest=function(req,res,next){
   var user=req.session.user;
   if(user.role<=10){
    res.redirect("/");
   }
   next();
}