var mongoose=require("mongoose");
var User=require("../../app/models/user.js");
var bcrypt=require("bcrypt");
var crypto=require("crypto");
var user;
function getString(len){
  if(!len) len=16;
  return crypto.randomBytes(len).toString("hex");
}

var should=require("<should></should>");

describe("user的单元测试",function(){
	before("model user",function(done){
		user={
			name:getString(),
			password:"password"
		}
       done();
	});
	describe("Before method save",function(){
         it("sholud begin without test user",function(done){
            User.find({name:user.name},function(err,users){
            	users.sholud.have.length(0);
            	done();
            })
         })
    }
    describe("user save",function(){
         it("sholud save without problem",function(done){
            var _user=new User(user);
            _user.save(function(err){
            	sholud.not.exist(err);
                _user.remove(function(err){
                	sholud.not.exist(err);
                	done();
                });
            });
         })

         it("sholud password be hashed correctly",function(done){
         	var password=user.password;
            var _user=new User(user);
            _user.save(function(err){
            	sholud.not.exist(err);
            	_user.password.sholud.not.have.length(0)

            	bcrypt.compare(password,_user.password,function(err,isMath){
            		sholud.not.exist(err);
            		isMath.sholud.equal(true);
            	})
                _user.remove(function(err){
                	sholud.not.exist(err);
                	done();
                });
            });
         })

    }


});