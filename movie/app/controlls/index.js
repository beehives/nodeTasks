var Category=require("../models/category");
var Movie=require("../models/movie");
exports.home=function(req,res){
  // console.log("www"+req.session.user.name);
  // var _user=req.session.user;
  // if(_user){
  //   app.locals.user=_user;
  // }
  // Movie.fetch(function(err,movies){
  //      if(err){
  //       console.log(err);
  //      }
  //      res.render("index",{
  //   title:"首页",
  //   movie:movies
  //    });
  // });
     Category.find({})
             .populate("movies")
             .exec(function(err,categorys){
                if(err){
                  console.log(err);
                }
                res.render("index",{
                  title:"首页",
                  categorys:categorys
                }); 
             })
  
}
//分页的逻辑
exports.pages=function(req,res){
     var categoryId=req.query.cat;
     var page=parseInt(req.query.page)||0;
     var sou=req.query.sou;
     var count=2;
     var indexs=page*count;
     //如果存在分类的Id则是点击了分类的链接
     if(categoryId){
           Category.find({_id:categoryId})
                   .populate({
                    path:"movies"
                   })
                   .exec(function(err,categorys){
                       if(err){
                        console.log(err);
                       }
                       var category=categorys[0] || {};
                       var movies=category.movies||[];
                       //分页实现
                       var results=movies.slice(indexs,indexs+count)||[];
                       //当前页
                       var currentPage=page+1;
                       //页数
                       var pagelength=Math.ceil(movies.length/count);
                       res.render("result",{  
                          title:"分页界面",
                          movies:results,
                          keyword:category.name,
                          currentPage:currentPage,
                          pagelength:pagelength,
                          query:"cat="+category._id
                       });
                   })   
     }else{  //如果没有则是通过搜索来找到电影
         Movie.find({title:sou})
              .exec(function(err,movies){
                if(err){
                  console.log(err);
                }
                var movie=movies[0];  
                res.render("result",{  
                    title:"分页界面",
                    movies:[movie],
                    keyword:movie.title,
                    currentPage:1,
                    pagelength:1,          
                });

              })

     }

}