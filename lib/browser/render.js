(function () {
    "use strict";
    var _ = require('underscore');
    var querystring = require('querystring');
    var getData = require('../common/get');     

    module.exports = function () {
        var urlSuffix = document.getElementById('clickcash-promo-api').src.replace(/^[^\?]+\??/, '');
        var elements = document.querySelectorAll('[data-clickcash]');
        _.each(elements, function (el) {
            var val = el.getAttribute("data-clickcash");
            var filterstring = querystring.parse(val);
            var searchObj = {
                tags: filterstring.tag,
                id: filterstring.id,
                target: filterstring.target,                           
                format: filterstring.format
            };            
            getData(searchObj , function (err, data) {
                if (typeof (data) != 'undefined') {
                    if (data.promos) {
                        if (data.promos.length > 0) {
                            var promoData = data.promos[0];
                            el.setAttribute('class' , 'clickcash-promo clickcash-promo-' + promoData.id + (el.getAttribute('class') ? ' ' + el.getAttribute('class') : ''));
                            if (promoData.format == "image") {
                                //el.insertAdjacentHTML('beforeend','');
                                el.innerHTML = '<A style="display:inline-block;" HREF="http://www.ifriends.net/userurl_membrg2/livehosts/couples/all-cam-girls/live-now/?' + urlSuffix + '" target="_parent"><img src="https://www.ifriends.net/Refer.dll?' + urlSuffix + '&url=' + promoData.launchURL + '" height="' + promoData.height + '" width="' + promoData.width + '" border="0"></A>';
                            } else {
                                el.innerHTML = '<IFRAME  SRC="https://www.ifriends.net' + promoData.launchURL + '?t=' + promoData.t + '&' + urlSuffix + '" height="' + promoData.height + '" width="' + promoData.width + '"  scrolling="No" frameborder="0" align="top"></IFRAME>';
                            }
                        }
                    }
                }
            });
        });                    
    };
})();
