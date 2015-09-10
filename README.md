# clickash-promo-api

[![NPM version](https://badge.fury.io/js/clickcash-promo-api.svg)


## How to use

### For the web

Download [filepath]

Implementation options here

```html
<div clickcash-promo="1923"></div>
```

### Standalone Node JS

```js
    var Clickcash = require('clickcash-promo-api');
    Clickcash.promo.get({
        ids: '1,2,3'
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }        
    });
```

## Debug / logging

TODO

clickcash-promo-api is powered by [debug](http://github.com/visionmedia/debug).
In order to see all the debug output, run your app with the environment variable
`DEBUG` including the desired scope.

To see the output from all of Socket.IO's debugging scopes you can use:

```
DEBUG=clickcash.promo-api* node myapp
```

## License

MIT



