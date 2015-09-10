var Clickcash = {};
Clickcash.promo = {};
Clickcash.promo.get = module.exports.get = require('./src/common/get');
if (typeof (window) !== 'undefined') {
    module.exports.pageBinder = require('./src/browser/pageBinder')();
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