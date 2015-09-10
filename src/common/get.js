(function () {
"use strict";
var _ = require('underscore'); 
var http = require('json-http');
//var validator = require('./validator');
    
/**
 * Validate the parameters for the get request.
 *
 * @param {Object} params
 * @return {Object} validation state
 * @api private
 */

var _formatSearchObject = function(searchObj) {
        
    _.each(searchObj , function (item, key, list) {
        if (_.isArray(item)) {
            item = item.join(',');
        }
        searchObj[key] = item;
    });

  return searchObj;
};
    

    
    /**
 * Validate the parameters for the get request.
 *
 * @param {Object} params
 * @return {Object} validation state
 * @api private
 */
/*
var _validateParams = function(params) {

  if (!params) {
    return {
      error: 'params cannot be null.'
    };
  }

  // title and id are optional, but one must be present
  if (!params.hasOwnProperty('id') && !params.hasOwnProperty('title')) {
    return {
      error: 'id or title param required.'
    };
  }

  if (params.hasOwnProperty('title') && !validator.isString(params.title)) {
    return {
      error: 'title must be a string.'
    };
  }

  if (params.hasOwnProperty('id') && !validator.isString(params.id)) {
    return {
      error: 'id must be a string.'
    };
  }

  if (!validator.isValidType(params)) {
    return {
      error: 'type must be: movie, series, episode.'
    };
  }

  if (params.hasOwnProperty('year') && !validator.isNumber(params.year)) {
    return { 
      error: 'year must be a valid number'
    };
  }

  if (!validator.isValidPlotType(params)) {
    return { 
      error: 'plot must be: short, full.'
    };
  }

  if (params.hasOwnProperty('incTomatoes') && 
    !validator.isBoolean(params.incTomatoes)) {
    return { 
      error: 'incTomatoes must be a boolean.'
    };
  }

};
*/

/**
 * Build the url string from the parameters.
 *
 * @param {Object} params
 * @return {String} url to call omdbapi.com
 * @api private

var _createUrl = function (params) {
        
        var baseUrl = 'http://www.omdbapi.com/';
        var query = '?';
        
        if (params.id) {
            query += 'i='.concat(params.id);
        }
        
        if (params.title) {
            
            if (params.id) {
                query += '&t=';
            } else {
                query += 't=';
            }
            
            query += encodeURIComponent(params.title);
        }
        
        if (params.year) {
            query += '&y='.concat(params.year);
        }
        
        if (params.incTomatoes) {
            query += '&tomatoes='.concat(params.incTomatoes);
        }
        
        if (params.type) {
            query += '&type='.concat(params.type);
        }
        
        if (params.plot) {
            query += '&plot='.concat(params.plot);
        }
        
        return baseUrl.concat(query, '&r=json&v=1');
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
        
        var baseUrl = 'http://mwww.clickcash.com/membrg/twrp.dll?pMode=API&pAppCode=TWRP_CCpromo&t=ALT/ClickCash/Inhouse_testing/promo-api/data_JSON.htm';
        var query = '';
                
        if (searchObj.types) {
            query += '&ptypes='.concat(searchObj.types);
        }
        if (searchObj.ids) {
            query += '&pids='.concat(searchObj.ids);
        }
        if (searchObj.tags) {
            query += '&ptags='.concat(searchObj.tags);
        }
        return baseUrl.concat(query, '&v=1');
    };

/**
 * Get film content from the imdb http service.
 *
 * @param {Object} params
 * @param {Function} callback
 * @api public
 */
module.exports = function (searchObj, callback) {
       
        var timeout = (searchObj) ? searchObj.timeout || 10000 : 10000;
        http.getJson(_createUrl(_formatSearchObject(searchObj)), timeout, function handleResponse(err, data) {
            
            if (err) {
                callback(err, null);
                return;
            }
            
            if (data.Error) {
                callback(data.Error, null);
            } else {
                callback(null, data);
            }

        });
    };
})();