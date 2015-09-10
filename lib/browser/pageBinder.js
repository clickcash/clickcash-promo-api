(function () {
    "use strict";
    var _ = require('underscore');
    var getData = require('../common/get');
    var urlSuffix = document.getElementById('clickcash-promo-api').src.replace(/^[^\?]+\??/, '');
    
    function appendStylesheet(filename) // TO BE REMOVED
    {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    function bindElements() {
        var elements = document.querySelectorAll('[data-clickcash]');
        var searchObj = {
            ids: [],
            tags: [],
            types: []
        };
        var ids = [];
        _.each(elements, function (el) {
            var val = el.getAttribute("data-clickcash");
            if (_.isFinite(val)) {
                searchObj.ids.push(val);
            }
        });       
        var data = getData(searchObj , 
        function (err, data) {
            _.each(elements, function (el) {
                var val = el.getAttribute("data-clickcash");
                if (_.isFinite(val)) {
                    var promoData = _.findWhere(data.promos, { id: val });                    
                    switch (promoData.type) {
                        case "1":                            
                            el.insertAdjacentHTML('beforeend', '<IFRAME  SRC="https://www.ifriends.net'+promoData.launchURL+'?t=' + promoData.t + '&' + urlSuffix +'" height="'+promoData.height+'" width="' + promoData.width + '"  scrolling="No" frameborder="0" align="top"></IFRAME>');
                        break;
                        case "2":
                            //el.insertAdjacentHTML('beforeend', '<IFRAME  SRC="https://www.ifriends.net/ifpage.dll?&acct=SYSADMINSE001&svc=ppes&art=pid_8929&ptemplateid=8929&pcustomtemplateid=0&pgeo=N&pexposetoolbar=&t=alt/clickcash/creative/03_2013/8929/8929.htm&ptargetframe=_blank&pclub=monicathebarbi&l=1&pisiframe=true" height="600" width="160" style="max-width:160px;max-height:600px;width:100%;" scrolling="No" frameborder="0" align="top"></IFRAME>');                            
                            el.insertAdjacentHTML('beforeend', '<IFRAME  SRC="https://www.ifriends.net' + promoData.launchURL + '?t=' + promoData.t + '&' + urlSuffix + '" height="' + promoData.height + '" width="' + promoData.width + '" scrolling="No" frameborder="0" align="top"></IFRAME>');
                        break;
                        case "3":
                            el.insertAdjacentHTML('beforeend', '<A style="text-align:center;display:inline-block;" HREF="http://www.ifriends.net/userurl_membrg2/livehosts/couples/all-cam-girls/live-now/?pccacct=SYSADMINSE001&pccsvc=ppes&pccart=pid_9324" target="_parent"><img src="https://www.ifriends.net/Refer.dll?Acct=VIVALADOMMYB&mode=3&SVC=ppes&art=pID_9324&url=http://images.ifriends.net/if_v2/cc/v2/creative/08_2015/9324/9324.jpg" height="90" width="728" border="0"></A>');
                        break;
                    }                                   
                }
            });
        });
    }
    module.exports = bindElements;
})();
