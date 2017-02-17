module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					watch: true,
					keepAlive: true,
					transform: [
						['babelify',
							{
								presets: [ 'es2015'],
							}
						]
					]
				},
				src: ['simple/test/main.js'],
				dest: './static/build/build.js'
			}
		},
		watch: {
			scripts: {
				files: ['simple/**/*.js'],
				tasks: ['browserify']
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['browserify']);
};
