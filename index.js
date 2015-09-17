module.exports.get = require('./lib/common/get');
if (typeof (window) !== 'undefined') {
   module.exports.render = require('./lib/browser/render');
   module.exports.render();
} else {
    /*
    Clickcash.promo.get({
        tags: ['amateur','160x600']
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }        
    });
     * */
}