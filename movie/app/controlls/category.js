var Category=require("../models/category");

exports.save=function(req,res){
   var _category=req.body.category;
   var  category=new Category(_category);
   category.save(function(err,categorys){
      if(err){
        console.log(err);
      }
      res.redirect("/category/list");
   });
  
}
exports.news=function(req,res){
   res.render('category_admin', {
        title: '后台分类录入页',
        category:{}
    });
}
exports.list=function(req,res){
  Category.fetch(function(err,categorys){
       if(err){
        console.log(err);
       }
      res.render("categorylist",{
        title:"分类列表页面",
        categorys:categorys
     })
  })
 }
