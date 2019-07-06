require('malta').checkDeps('uglify-js');

var uglify_js = require("uglify-js"),
	path = require('path'),
	fs = require('fs');

function malta_js_uglify(o, options) {

	var self = this,
		start = new Date(),
		msg,
		pluginName = path.basename(path.dirname(__filename));

	options = options || {};
	options.fromString = true;

	return function (solve, reject){
        try {
            o.content = uglify_js.minify(o.content+"", options).code;
            fs.writeFile(o.name, o.content, function(err) {
                err && self.doErr(err, o, pluginName);
                msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
                
                err
                    ? reject(`Plugin ${pluginName} write error:\n${err}`)
                    : solve(o);
                self.notifyAndUnlock(start, msg);
            });
        } catch (err) {
            self.doErr(err, o, pluginName);
            reject(`Plugin ${pluginName} uglifycation error:\n${err}`)
            self.notifyAndUnlock(start, msg);
        }
	};
}
malta_js_uglify.ext = ['js', 'coffee', 'ts'];
module.exports = malta_js_uglify;