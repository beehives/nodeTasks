var mongoose=require("mongoose");
var movieSchema=require("../schemas/movie.js");

var Movie=mongoose.model("movies",movieSchema);

module.exports=Movie;