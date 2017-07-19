$(function(){
	$(".del").click(function(e){
		var target=e.target;
		var id=target.getAttribute("dataId");
		var tr=$(".item-id-"+id);
		var text=$.ajax({
			type:"DELETE",
			url:"/admin/list/"+id,
			success:function(data,textStatus){
                 if(tr.length>0){
                 	$(tr).remove();
                 }
			}
		});
	});
    
   $("#douban").blur(function(){
   	   var douban=$(this);
   	   var id=douban.val();
   	   if(id){
   	   	  $.ajax({
   	   	  	url:"https://api.douban.com/v2/movie/subject/"+id,
   	   	  	cache:true,
   	   	  	type:"get",
   	   	  	dataType:"jsonp",
   	   	  	crossDomain:true,
   	   	  	jsonp:"callback",
   	   	  	success:function(data){
   	   	  		$("#inputDoctor").val(data.directors[0].name);
   	   	  		$("#inputTitle").val(data.title);
   	   	  		$("#inputCountry").val(data.countries);
   	   	  		$("#inputPoster").val(data.images.small);
   	   	  		$("#inputYear").val(data.year);
   	   	  		$("#inputSummary").val(data.summary);
   	   	  	}
   	   	  });
   	   }
   });
})