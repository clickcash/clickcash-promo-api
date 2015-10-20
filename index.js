module.exports.get = require('./lib/common/get');
if (typeof (window) !== 'undefined') {
    module.exports = require('./lib/browser/render');
   // module.exports.onData = function () { };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            module.exports.render();
        }, false);
    } else {
        module.exports.render();
    }
} else {    
    module.exports.get({
        tags: ['amateur', '160x600']
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}