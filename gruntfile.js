(function () {
	
	var env = require('./env.js');

	module.exports = function (grunt) {
		"use strict";

		grunt.initConfig({
			concurrent: {
				dev: [
					"nodemon:dev",
					"watch:scripts"
				],
				options: { logConcurrentOutput: true }
			},
			nodemon: {
				dev: {
					script: "server.js",
					options: {
						env: {
							PORT: "3000",
							ADMIN_PW: env.ADMIN_PW,
							FB_APP_ID: env.FB_APP_ID,
							FB_APP_SECRET: env.FB_APP_SECRET,
							SITE_URL: "http://localhost:3000/",
							SESSION_SECRET: env.SESSION_SECRET,
							MONGODB: env.MONGODB,
							ENV: "DEV",
							SQL_API_HOST: "localhost",
							SQL_API_PATH: "/delphipicks-sqlapi/api"
						},
						ignore: [
							"node_modules/**",
							"public/**"
						]
					}
				}
			},
			watch: {
				scripts: {
					files: [
						"api/**/*.js",
						"realtime/**/*.js",
						"auth/**/*.js",
						"data/**/*.js",
						"scrape/**/*.js",
						"sqlapiClient/**/*.js",
						"public/app/**/*.js",
						"public/admin/**/*.js",
						"gruntfile.js",
						"env.js",
						"server.js"
					],
					tasks: ["jshint"],
					options: { spawn: false }
				}
			},
			jshint: {
				scripts: ["<%= watch.scripts.files %>"]
			},
			clean: {
				options: { force: true },
				oldRelease: ["./../../../Release/Delphi Picks/*", "!./../../../Release/Delphi Picks/.git/**"],
				buildFiles: ["./../../../Release/delphi*.js", "./../../../Release/index.html"]
			},
			copy: {
				files: {
					src: ["**/*", "!public/app/index.html", "!gruntfile.js", "!env.js",
								"!public/css/site.css", "!public/app/**/*.js", "!**/node_modules/**",
								"!public/lib/**", "!public/admin/**", "!todo.txt"],
					dest: "./../../../Release/Delphi Picks/"
				}
			},
			concat: {
				options: { seperator: ";" },
				release: {
					src: ["public/app/**/*.js"],
					dest: "../../../Release/delphi.js"
				}
			},
			ngAnnotate: {
				release: {
					files: [{
						expand: true,
						src: ["../../../Release/delphi.js"],
						ext: ".annotated.js",
						extDot: "last"
					}]
				}
			},
			uglify: {
				release: {
					files: { "../../../Release/Delphi Picks/public/app/delphi.min.js": ["../../../Release/delphi.annotated.js"] }
				},
				options: {
					compress: {
						drop_console: true
					}
				}
			},
			csslint: {
				release: {
					options: {
						"unqualified-attributes": false
					},
					src: ["./public/css/**/*.css"]
				}
			},
			cssmin: {
				release: {
					files: { "../../../Release/Delphi Picks/public/css/site.min.css": ["./public/css/site.css"] }
				}
			},
			processhtml: {
				options: {
					data: {
						styles:
						'<link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />\n' +
						'<link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/css/bootstrap-theme.min.css" rel="stylesheet" />',
						scripts:
						'<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>\n' +
						'<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js"></script>\n' +
						'<script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.0/ui-bootstrap.js"></script>\n' +
						'<script src="//cdn.socket.io/socket.io-1.0.4.js"></script>'
					}
				},
				release: {
					files: {
						//"./../../../Release/Delphi Picks/public/app/index.html": ["./public/app/index.html"]
						"./../../../Release/index.html": ["./public/app/index.html"]
					}
				}
			},
			htmlhint: {
				release: {
					options: {
						"attr-lower-case": true,
						"attr-value-not-empty": false,
						"tag-pair": true,
						"tag-self-close": false, //due to meta tag
						"tagname-lowercase": true,
						"id-class-value": true,
						"id-class-unique": true,
						"src-not-empty": true,
						"img-alt-required": true
					},
					src: ["./public/app/**/*.html", "!./public/app/index.html",
								"./../../../Release/index.html"]
				}
			},
			htmlmin: {
				release: {
					options: {
						removeComments: true,
						removeOptionalTags: true,
						collapseWhitespace: true
					},
					files: {
						"./../../../Release/Delphi Picks/public/app/index.html": ["./../../../Release/index.html"],
						"./../../../Release/Delphi Picks/public/app/game/delphi-game.html": ["./public/app/game/delphi-game.html"],
						"./../../../Release/Delphi Picks/public/app/game/game.html": ["./public/app/game/game.html"],
						"./../../../Release/Delphi Picks/public/app/navigation/delphi-nav.html": ["./public/app/navigation/delphi-nav.html"],
						"./../../../Release/Delphi Picks/public/app/round/round.html": ["./public/app/round/round.html"],
						"./../../../Release/Delphi Picks/public/app/tournament/tournament.html": ["./public/app/tournament/tournament.html"]
					}
				}
			},
			exec: {
				git_add: {
					cwd: "./../../../Release/Delphi Picks/",
					command: "git add . --all"
				},
				git_commit: {
					cwd: "./../../../Release/Delphi Picks/",
					command: "git commit -m \"Deploy: <%= grunt.template.today(\'mm-dd-yyyy @ hh:MM:ss TT\') %>\""
				},
				git_push: {
					cwd: "./../../../Release/Delphi Picks/",
					command: "git push azure master"
				}
			}
		});

		grunt.loadNpmTasks("grunt-concurrent");
		grunt.loadNpmTasks("grunt-contrib-watch");
		grunt.loadNpmTasks("grunt-nodemon");
		grunt.loadNpmTasks("grunt-contrib-jshint");
		grunt.loadNpmTasks("grunt-contrib-clean");
		grunt.loadNpmTasks("grunt-contrib-copy");
		grunt.loadNpmTasks("grunt-contrib-concat");
		grunt.loadNpmTasks("grunt-ng-annotate");
		grunt.loadNpmTasks("grunt-contrib-uglify");
		grunt.loadNpmTasks("grunt-contrib-csslint");
		grunt.loadNpmTasks("grunt-contrib-cssmin");
		grunt.loadNpmTasks("grunt-processhtml");
		grunt.loadNpmTasks("grunt-htmlhint");
		grunt.loadNpmTasks("grunt-contrib-htmlmin");
		grunt.loadNpmTasks("grunt-exec");

		grunt.registerTask("default", ["jshint:scripts", "concurrent:dev"]);
		grunt.registerTask("release", ["clean:oldRelease", "clean:buildFiles",
																	 "copy", "concat", "ngAnnotate", "uglify", "csslint", "cssmin", "processhtml",
																	 "htmlhint", "htmlmin", "clean:buildFiles", "exec"]);
	};
}());