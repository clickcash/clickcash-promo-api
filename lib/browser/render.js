(function () {
    "use strict";
    //module.exports.onData = function () { return this; };
    var querystring = require('querystring');
    //var http = require('json-http');
    var getData = require('../common/get');
    var scriptParameters = querystring.parse(document.getElementById('clickcash-promo-api').src.replace(/^[^\?]+\??/, '').toLowerCase());
    
    function _appendScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);      
    }

    function _addEvent(element , evt , data) {
        var myEvent;
        if (document.createEvent) {
            myEvent = document.createEvent('Event');
            myEvent.initEvent(evt, true, true);
            myEvent.detail = data;
        } else {
            myEvent = new CustomEvent(evt , {
                detail: data
            });
        }        
        element.dispatchEvent(myEvent);        
    }

    function _populateElement(el , searchObj) {
        (function (obj) {
            var htmlElement = obj;
            getData(searchObj , function (err, data) {                
                if (typeof (data) != 'undefined') {
                    if (data.promos) {
                        if (data.promos.length > 0) {
                            var promoData = data.promos[0];
                            var params = JSON.parse(JSON.stringify(scriptParameters));
                            params.pccart = (htmlElement.getAttribute('data-clickcash-art') ? htmlElement.getAttribute('data-clickcash-art') : 'pid_' + promoData.id);
                            if (htmlElement.getAttribute('data-clickcash-svc') || scriptParameters.pccsvc) {
                                params.pccsvc = (htmlElement.getAttribute('data-clickcash-svc') ? htmlElement.getAttribute('data-clickcash-svc') : scriptParameters.pccsvc);
                            }
                            var urlSuffix = querystring.stringify(params);
                            htmlElement.setAttribute('class' , 'clickcash-promo-id-' + promoData.id + (htmlElement.getAttribute('class') ? ' ' + htmlElement.getAttribute('class') : ''));
                            if (promoData.format == "image") {
                                htmlElement.innerHTML = '<A style="display:inline-block;" HREF="http://www.ifriends.net/userurl_membrg2/livehosts/couples/all-cam-girls/live-now/?' + urlSuffix + '" target="_parent"><img src="https://www.ifriends.net/Refer.dll?' + urlSuffix + '&url=' + promoData.launchURL + '" height="' + promoData.height + '" width="' + promoData.width + '" border="0"></A>';
                            } else {
                                htmlElement.innerHTML = '<IFRAME ' + promoData.attributes + ' SRC="https://www.ifriends.net' + promoData.launchURL + '?t=' + promoData.t + promoData.queryArgs + '&' + urlSuffix + '&pparenthost=' + encodeURIComponent(document.location.protocol + '//' + document.location.host) + '" height="' + promoData.height + '" width="' + promoData.width + '"  scrolling="No" frameborder="0" align="top"></IFRAME>' + promoData.extracode;
                                var scripts = document.querySelectorAll(".clickcash-promo-" + promoData.id + " script");
                                for (var i = 0; i < scripts.length; i++) {
                                    _appendScript(scripts[i].src);
                                }
                            }
                        }
                    }
                    _addEvent(htmlElement , 'Clickcash.promo.onRender' , data);
                }
            });
        })(el);              
    }

    function _appendDefaultPromo() {
        var pMode = (scriptParameters.pmode || '');
        if (pMode.toLowerCase() == 'auto') {            
            var node = document.createElement("DIV");
            node.setAttribute('data-clickcash' , 'tag=floatingresponsive');
            document.body.appendChild(node);
        }        
    }
    
    module.exports.render = function () {
        _appendDefaultPromo();
        var elements = document.querySelectorAll('[data-clickcash]');
        var jsonSearchObjects = [];
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            el.setAttribute('class' , 'clickcash-promo clickcash-promo-index-' + i + (el.getAttribute('class') ? ' ' + el.getAttribute('class') : ''));            
            var val = el.getAttribute("data-clickcash");
            var filterstring = querystring.parse(val);
            var searchObj = {
                tags: filterstring.tag,
                id: filterstring.id,
                target: filterstring.target,
                format: filterstring.format,
                index: i.toString()
            };
            jsonSearchObjects.push(searchObj);
        }
        getData(jsonSearchObjects , function (err, data) {
            if (typeof (data) != 'undefined') {
                var htmlElement = document.querySelector('.clickcash-promo-index-' + data.index);
                if (data.promos) {
                    if (data.promos.length > 0) {
                        var promoData = data.promos[0];                       
                        var params = JSON.parse(JSON.stringify(scriptParameters));
                        params.pccart = (htmlElement.getAttribute('data-clickcash-art') ? htmlElement.getAttribute('data-clickcash-art') : 'pid_' + promoData.id);
                        if (htmlElement.getAttribute('data-clickcash-svc') || scriptParameters.pccsvc) {
                            params.pccsvc = (htmlElement.getAttribute('data-clickcash-svc') ? htmlElement.getAttribute('data-clickcash-svc') : scriptParameters.pccsvc);
                        }
                        var urlSuffix = querystring.stringify(params);
                        htmlElement.setAttribute('class' , 'clickcash-promo-id-' + promoData.id + (htmlElement.getAttribute('class') ? ' ' + htmlElement.getAttribute('class') : ''));
                        if (promoData.format == "image") {
                            htmlElement.innerHTML = '<A style="display:inline-block;" HREF="http://www.ifriends.net/userurl_membrg2/livehosts/couples/all-cam-girls/live-now/?' + urlSuffix + '" target="_parent"><img src="https://www.ifriends.net/Refer.dll?' + urlSuffix + '&url=' + promoData.launchURL + '" height="' + promoData.height + '" width="' + promoData.width + '" border="0"></A>';
                        } else {
                            htmlElement.innerHTML = '<IFRAME ' + promoData.attributes + ' SRC="https://www.ifriends.net' + promoData.launchURL + '?t=' + promoData.t + promoData.queryArgs + '&' + urlSuffix + '&pparenthost=' + encodeURIComponent(document.location.protocol + '//' + document.location.host) + '" height="' + promoData.height + '" width="' + promoData.width + '"  scrolling="No" frameborder="0" align="top"></IFRAME>' + promoData.extracode;
                            var scripts = document.querySelectorAll(".clickcash-promo-" + promoData.id + " script");
                            for (var i = 0; i < scripts.length; i++) {
                                _appendScript(scripts[i].src);
                            }
                        }
                    }
                }
                _addEvent(htmlElement , 'Clickcash.promo.onRender' , data);
            }
        });
    };
    
})();
