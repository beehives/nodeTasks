var mongoose=require('mongoose');
var bcrypt=require("bcrypt"); //加密算法 随机生成salt+md5组合成密码
var SALT_WORK_FACTOR=10;
var userSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
  role:Number,
  meta:{
    	createAt:{
    		type:Date,
    		default:Date.now()
    	},
    	updateAt:{
    		type:Date,
    		default:Date.now()
    	}
    }
});

userSchema.pre("save",function(next){
  var user=this;	
  if(this.isNew){
  	this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
  	this.meta.updateAt=Date.now();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){ 
      if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
             user.password=hash;
             next();
        });   
    });
});
//在methods添加的方法是实例方法
userSchema.methods={
  comparePassword:function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
        if(err){
          return cb(err);
        }
        cb(null,isMatch);
    });
  }
}
//statics上面的添加是model方法
userSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort("meta.updateAt")
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}

}

module.exports=userSchema;