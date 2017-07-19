var Movie=require("../models/movie");
var Comment=require("../models/comment");
var Category=require("../models/category");
var _=require("underscore");
var fs=require("fs");
var path=require("path");


exports.detail=function(req,res){
    var id=req.params.id;
      Movie.findById(id,function(err,movie){
        //mongodb中模型自带有update方法，$set用来修改值或是增加值
        //$inc用来字段的自增
        Movie.update({_id:id},{$inc:{pv:1}},function(err){
          console.log(err);
        })
        Comment
             .find({movie:id})
             .populate("from")
             .populate("reply.from reply.to","name")
             .exec(function(err,comments){
               res.render("detail",{
                title:"详细页:"+movie.title,
                movie:movie,
                comments:comments
                });
              })    
    })
}
exports.update=function(req,res){
   var id=req.params.id;
   if(id){
    Movie.findById(id,function(err,movie){
       Category.find({},function(err,categorys){
            res.render("admin",{
            title:"更新页",
            movie:movie,
            categorys:categorys
           });
       })
    })
   }
}
exports.movieR=function(req,res){
   var id=req.body.movie._id;
   var movieObject=req.body.movie;
   var _movie;
  
   if(req.poster){
    movieObject.poster=req.poster; //如果有上传的图片，则将图片改为上传图片的路径
   }

   if(id){
    Movie.findById(id,function(err,movie){
     if(err){
      console.log(err);
     }
     _movie=_.extend(movie,movieObject);//这里是把更新后对象赋给_movie
     _movie.save(function(err,movie){
         if(err){
          console.log(err);
         }
         res.redirect("/movie/"+movie._id);
     });
    });
   }else{
    _movie=new Movie(movieObject);
    console.log(categoryName);
    var categoryId=movieObject.category;
    var categoryName=movieObject.categoryName;
    _movie.save(function(err,movie){
      if(err){
        console.log("err");
      }
      if(categoryId){
        Category.findById(categoryId,function(err,categorys){
           categorys.movies.push(movie._id);
           categorys.save(function(err,category){
              res.redirect("/movie/"+movie._id);
           })
        })
      }else if(categoryName){
         var category=new Category({
             name:categoryName,
             movies:[movie._id]
         })
         category.save(function(err,categorys){
              movie.category=categorys._id;
              movie.save(function(err,movie){
                 res.redirect("/movie/"+movie._id);
              });
         })
      }

    });
   }

}
exports.movieN=function(req,res){
   Category.find({},function(err,categorys){
     res.render('admin', {
          title: '注册电影',
          categorys:categorys,
          movie: {
              title: '',
              doctor: '',
              country: '',
              year: '',
              poster: '',
              flash: '',
              summary: '',
              language: ''
          }
      });
   })
}
exports.moivelist=function(req,res){
  Movie.fetch(function(err,movies){
       if(err){
        console.log(err);
       }
      res.render("list",{
        title:"表单页",
        movies:movies
     })
  })
}
exports.moviedelte=function(req,res){
    var id=req.params.id;
    if(id){
      Movie.remove({_id:id},function(err,movie){
            if(err){
              console.log(err);
            }else{
              res.json({success:1});
            }

      });
    }
}
//海报存储的中间件,这里用到一个中间件是
exports.savePoster=function(req,res,next){
      var posterData=req.files.uploadPoster;
      var filePath=posterData.path;
      var originName=posterData.originalFilename;
      console.log(posterData);
      if(originName){
        //fs的获取和写的方法是较为耗时的
        fs.readFile(filePath,function(err,data){
             var timerstamp=new Date().getTime();
             var type=posterData.type.split("/")[1];
             var poster=timerstamp+"."+type;
             var newPath=path.join(__dirname,"../../","/public/upload/"+poster);
             fs.writeFile(newPath,data,function(){
                req.poster=poster;
                next();
             });
        });
      }else{
        next();
      }
}