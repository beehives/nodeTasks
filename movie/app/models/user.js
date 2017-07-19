var mongoose=require("mongoose");
var userSchema=require("../schemas/user.js");

var User=mongoose.model("users",userSchema);

module.exports=User;