require('malta').checkDeps('uglify-js');

var uglify_js = require("uglify-js"),
	path = require('path'),
	fs = require('fs');

function malta_js_uglify(o, options) {
	var self = this,
		start = new Date(),
		msg;

	options = options || {};
	options.fromString = true;

	// o.name = o.name.replace(/\.js$/, '.pack.js');

	o.content = uglify_js.minify(o.content, options).code;

	return function (solve, reject){
		fs.writeFile(o.name, o.content, function(err) {
			if (err == null) {
				msg = 'plugin ' + path.basename(path.dirname(__filename)).white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			} else {
				console.log('[ERROR] uglify-js says:');
				console.dir(err);
				self.stop();
			}
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_js_uglify.ext = ['js', 'coffee', 'ts'];
module.exports = malta_js_uglify;