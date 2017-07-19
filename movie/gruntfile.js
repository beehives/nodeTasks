module.exports=function(grunt){
	grunt.initConfig({
	  watch:{
  	 	 jade:{
	  	 	files:["views/**"],
	  	 	options:{
	  	 		livereload:true
	  	 	}
  	     },
       js:{
         	files:["public/js/**","models/**/*.js","schemas/**/*.js"],
         	// tasks;["jshint"],
         	options:{
         		livereload:true
         	}
        }
	  	 
	  },
   nodemon: {  //配置自动重启
     dev: {
          script: 'app.js',
          options: {
               args: [],
               nodeArgs: ['--debug'],
               ignore: ['README.md', 'node_modules/**', '.DS_Store'],
               ext: 'js',
               watch: ['./'], //监听根目录
               delay: 1000,
               env: {
                    PORT: '3000'
               },
               cwd: __dirname
          }
       }
    },

    mochaTest:{
      test: {
        options:{
           reporter:"spec"
        },
        src:['test/**/*.js']
      }
    },


    concurrent:{
    		target: {
    			tasks: ['nodemon', 'watch'],
    			options: {
    				logConcurrentOutput: true
    			}
    		}  	
	  }

	});
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-nodemon");
	grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-mocha-test");

	grunt.option("force",true);

	grunt.registerTask("default",["concurrent"]);
  grunt.registerTask("test",["mochaTest"]);
}