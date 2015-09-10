var Clickcash = {};
Clickcash.promo = {};
Clickcash.promo.get = module.exports.get = require('./lib/common/get');
if (typeof (window) !== 'undefined') {
    module.exports.pageBinder = require('./lib/browser/pageBinder')();
} else {
    Clickcash.promo.get({
        ids: '1,2,3'
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }        
    });

    Clickcash.promo.get({
        ids: [1,2,3]
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}