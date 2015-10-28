(function () {
    "use strict";
    //var http = require('json-http');
    var jsonpClient = require('jsonp-client');

    function addCallback(url) {
        // The URL already has a callback
        if (url.match(/callback=[a-z]/i)) {
            return url;
        }
        return url + ("&callback=ccProcessData" + Math.random()).replace('.', '');
    }

    function searchObjToURL (searchObj) {
            var baseUrl = 'https://secure.clickcash.com/userurl_membrg/clickcash-promo-api/?';
            var query = '';
            if (searchObj.tags) {
                query += '&ptags='.concat(searchObj.tags);
            }
            if (searchObj.id) {
                query += '&pid='.concat(searchObj.id);
            }
            if (searchObj.target) {
                query += '&ptarget='.concat(searchObj.target);
            }
            if (searchObj.format) {
                query += '&pformat='.concat(searchObj.format);
            }
            if (searchObj.index) {
                query += '&pindex='.concat(searchObj.index);
            }
            baseUrl = baseUrl.concat(query.substring(0));
            if (typeof (window) !== 'undefined') {            
                baseUrl = addCallback(baseUrl);
            }        
            return baseUrl;
    }

    module.exports = function (jsonSearchObjects, callback) {
      
        var URLs = [];
        jsonSearchObjects = (jsonSearchObjects.constructor === Array ? jsonSearchObjects : [jsonSearchObjects]);        
        for (var i = 0; i < jsonSearchObjects.length; i++){
            URLs.push(searchObjToURL(jsonSearchObjects[i]));
        }
        jsonpClient(URLs, function (err) {                     
                if (err) {
                    callback(err, null);
                    return;
                }
                for (var i = 0; i < arguments.length; i++) {
                    if (i > 0) {
                        var data = arguments[i];
                        if (typeof data != 'undefined') {
                            if (data.Error) {
                                callback(data.Error, null);
                            } else {
                                callback(null, data);
                            }
                        }
                    }
                }
            });
        };
})();