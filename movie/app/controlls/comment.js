var Comment=require("../models/comment");

exports.save=function(req,res){
 var _comment=req.body.comment;
 var movieid=_comment.movie;
 if(_comment.cid ){
   Comment.findById(_comment.cid,function(err,comments){
       var reply={
       	 from:_comment.from,
       	 to:_comment.tid,
       	 content:_comment.content
       }
       comments.reply.push(reply);
       comments.save(function(err,comment){
       	 if(err){
	 		console.log(err);
	 	 }
	     res.redirect("/movie/"+movieid);
       });
   });
 }else{
 	 var comment=new Comment(_comment);
	 comment.save(function(err,comment){
	 	if(err){
	 		console.log(err);
	 	}
	 res.redirect("/movie/"+movieid);
     });
 }

}
