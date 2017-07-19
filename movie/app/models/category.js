var mongoose=require("mongoose");
var categorySchema=require("../schemas/category.js");

var Category=mongoose.model("categorys",categorySchema);

module.exports=Category;