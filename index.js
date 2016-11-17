require('malta').checkDeps('uglify-js');

var uglify_js = require("uglify-js"),
	path = require('path'),
	fs = require('fs');

function malta_js_uglify(o, options) {

	var self = this,
		start = new Date(),
		msg,
		pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	options = options || {};
	
	options.fromString = true;

	try{
		o.content = uglify_js.minify(o.content+"", options).code;
	} catch(err) {
		doErr(err);
	}

	return function (solve, reject){
		fs.writeFile(o.name, o.content, function(err) {
			err && doErr(err);
			msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_js_uglify.ext = ['js', 'coffee', 'ts'];
module.exports = malta_js_uglify;