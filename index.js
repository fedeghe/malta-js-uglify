const uglify_js = require("uglify-js"),
	path = require('path'),
	fs = require('fs');

function malta_js_uglify(o, options) {

	const self = this,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename));
    
    let msg;

	options = options || {};
	options.fromString = true;
	return (solve, reject) => {
        try {
            o.content = uglify_js.minify(o.content+"", options).code;
            fs.writeFile(o.name, o.content, err => {
                err && self.doErr(err, o, pluginName);
                msg = 'plugin ' + pluginName.white() + (err ? ' failed to write ' : ' wrote ') + o.name + ' (' + self.getSize(o.name) + ')';

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