(function () {
    "use strict";    
    var querystring = require('querystring');    
    var getData = require('../common/get');
    
    function _getScriptParameters() {
        var scripts = document.querySelectorAll("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.match(/clickcash-promo-api/gi)) {
                return scripts[i].src.replace(/^[^\?]+\??/, '').toLowerCase();
            }
        }
        return '';
    }

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

    function _appendDefaultPromo() {
        var pMode = (scriptParameters.pmode || '');
        if (pMode.toLowerCase() == 'auto') {            
            var node = document.createElement("DIV");
            node.setAttribute('data-clickcash' , 'tag=floatingresponsive');
            document.body.appendChild(node);
        }        
    }
    
    var scriptParameters = querystring.parse(_getScriptParameters());

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
                        for (var prop in params) {
                            if (!prop.match(/pccart|pccsvc|pccacct/gi)) {
                                delete params[prop];
                            }
                        }
                        var urlSuffix = querystring.stringify(params);
                        htmlElement.setAttribute('class' , 'clickcash-promo-id-' + promoData.id + (htmlElement.getAttribute('class') ? ' ' + htmlElement.getAttribute('class') : ''));
                        if (promoData.format == "image") {
                            htmlElement.innerHTML = '<A style="display:inline-block;" HREF="' + promoData.queryArgs + (promoData.queryArgs.indexOf('?') > 0 ? '&' : '?') + urlSuffix + '" target="_parent"><img src="https://www.ifriends.net/Refer.dll?' + urlSuffix + '&url=' + promoData.launchURL + '" height="' + promoData.height + '" width="' + promoData.width + '" border="0"></A>';
                        } else {
                            htmlElement.innerHTML = '<IFRAME ' + promoData.attributes + ' SRC="https://www.ifriends.net' + promoData.launchURL + '?t=' + promoData.t + promoData.queryArgs + '&' + urlSuffix + '&pparenthost=' + encodeURIComponent(document.location.protocol + '//' + document.location.host) + '" height="' + promoData.height + '" width="' + promoData.width + '"  scrolling="No" frameborder="0" align="top"></IFRAME>' + promoData.extracode.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                            var scripts = document.querySelectorAll(".clickcash-promo-id-" + promoData.id + " script");
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
