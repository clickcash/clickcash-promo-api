module.exports.getJson = function () {
    //var that = {};
    var url = arguments[0];
    var timeoutInMs = 100000000;
    var callback;
    function extend(ns, ns_string) {
        var parts = ns_string.split('.'),
            parent = ns,
            pl, i;
        if (parts[0] == "window") {
            parts = parts.slice(1);
        }
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            //create a property if it doesnt exist
            if (typeof parent[parts[i]] == 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    }
        
    if (typeof (arguments[1]) === 'function') {
        callback = arguments[1];
    }
    
    if (typeof (arguments[1]) === 'number') {
        timeoutInMs = arguments[1];
        callback = arguments[2];
    }

    var options = {};
    //that.send = function (src, options) {
    var callback_name = options.callbackName || 'Clickcash.promo.onData',
    //  on_success = options.onSuccess || function () { },
    on_success = options.onSuccess || callback,
    on_timeout = options.onTimeout || function () { },
    timeout = options.timeout || 10; // sec
    
    

    var globalCallback = extend(window , callback_name);
    console.log(globalCallback);
    
    var timeout_trigger = window.setTimeout(function () {
        globalCallback = function () { return 'error';};
        on_timeout();
    }, timeout * 1000);
    

    globalCallback = function (data) {    
        window.clearTimeout(timeout_trigger);
        on_success(null, data);
    };
    console.log(globalCallback);
    
    var script = document.createElement('script');
    script.type  = 'text/javascript';
    script.async = true;
    script.src   = url;
        
    document.getElementsByTagName('head')[0].appendChild(script);

    //}
    
    return Clickcash.promo.onData;
};