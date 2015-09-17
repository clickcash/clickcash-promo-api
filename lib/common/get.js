(function () {
"use strict";
//var _ = require('underscore'); 
var http = require('json-http');
//var validator = require('./validator');
    
/**
 * Validate the parameters for the get request.
 *
 * @param {Object} params
 * @return {Object} validation state
 * @api private
 */
/*
var _formatSearchObject = function(searchObj) {
        
    _.each(searchObj , function (item, key, list) {
        if (_.isArray(item)) {
            item = item.join(',');
        }
        searchObj[key] = item;
    });

  return searchObj;
};
    */

/**
 * Build the url string from the parameters.
 *
 * @param {Object} params
 * @return {String} url to call omdbapi.com
 * @api private
 */
var _createUrl = function (searchObj) {        
        var baseUrl = 'http://mwww.clickcash.com/userurl_membrg/clickcash-promo-api/?';
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
        return baseUrl.concat(query.substring(0), '&v=1');
 };

/**
 * Get Clickcash Promo Data
 *
 * @param {Object} params
 * @param {Function} callback
 * @api public
 */
module.exports = function (searchObj, callback) {
       
        var timeout = (searchObj) ? searchObj.timeout || 10000 : 10000;
        var URL = _createUrl(searchObj);
        
        http.getJson(URL, timeout, function handleResponse(err, data) {

            if (err) {
                callback(err, null);
                return;
            }
            
            if (typeof data != 'undefined') {
                if (data.Error) {
                    callback(data.Error, null);
                } else {
                    callback(null, data);
                }
            }
        });
    };
})();