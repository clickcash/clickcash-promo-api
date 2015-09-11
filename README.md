# clickash-promo-api

![NPM version](https://badge.fury.io/js/clickcash-promo-api.svg)


## How to use

### For the web

Download the file 'clickcash-promo-api.min.js' found at the root of this repository and call it right before your closing 'BODY' tag.

```html
	<script src="/clickcash-promo-api.min.js?pccact=[YOUR_ACCOUNT_CODE_HERE]"></script>
</body>
```

Be sure to replace [YOUR_ACCOUNT_CODE_HERE] with your Clickcash account code. To create one visit www.clickcash.com.

Once the script has been added to your web page(s), full page responsive ads will be displayed to users with your account code.

To disable this functionality, pass pMode=advanced to the script and utilize the following advanced functionality.

### Advanced options

#### Retrieve Specific By ID
```html
<div data-clickcash="id=82193"></div>
```

#### Retrieve random by tag
```html
<div data-clickcash="tag=blonde"></div>
```

#### Retrieve random by multiple tags
```html
<div data-clickcash="tag=blonde&tag=dynamic"></div>
```

#### Retrieve random by tag with dimensions in mind
```html
<div data-clickcash="tag=blonde&tag=160x600"></div>
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



