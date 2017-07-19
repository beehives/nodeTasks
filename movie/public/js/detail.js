$(function(){
    $(".comment").click(function(e){
           var target=$(this);
           var toId=target.data("tid");
           var commentId=target.data("cid");
         
         //发给谁
         if($("toId").length>0){
            $("toId").val(toId);
         }else{
            $("<input>").attr({
            type:"hidden",
            name:"comment[tid]",
            id:"toId",
            value:toId,
            }).appendTo("#commentForm"); 
         }
        
         
         //comments的_id
         if($("commentId").length>0){
              $("commentId").val(commentId);
         }else{
            $("<input>").attr({
            type:"hidden",
            name:"comment[cid]",
            id:"commentId",
            value:commentId,
            }).appendTo("#commentForm"); 
         }
         
    });

})