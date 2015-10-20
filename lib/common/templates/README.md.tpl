# clickash-promo-api

## How to use

### For the web

Load the `clickcash-promo-api.min.js` file right before the closing `</body>` tag on your website.

We recommend serving it right from our our server.

Example:

```html
	<script type="text/javascript" id="clickcash-promo-api" src="https://images.ifriends.net/if_v2/clickcashpromoapi/<%- version %>/clickcash-promo-api.min.js?pccacct=YOUR_ACCOUNT_CODE_HERE&pmode=auto"></script>
</body>
```

Be sure to replace `YOUR_ACCOUNT_CODE_HERE` with your Clickcash account code. To create a Clickcash affiliate account visit www.clickcash.com.

#### That's It!

Once the script has been added to your web page(s), full page responsive ads will be displayed to users and credit will be applied to your account code when applicable.

### Advanced options

The API can be used to automatically pull promos from our expansive library using the syntax below. Use our API Promo Manager (http://www.clickcash.com/userurl_membrg/clickcash-promo-api/generator/)

#### Retrieve specific promo By ID
```html
<div data-clickcash="id=82193"></div>
```
#### Retrieve random promo by tag
```html
<div data-clickcash="tag=blonde"></div>
```

#### Retrieve random promo by multiple tags
```html
<div data-clickcash="tag=blonde&tag=dynamic"></div>
```

#### Retrieve random promo by tag with specific dimensions
```html
<div data-clickcash="tag=blonde&tag=160x600"></div>
```

#### Custom ART value (note that ART values are used for tracking performance in reports)
```html
<div data-clickcash="tag=blonde&tag=160x600" data-clickcash-art="sidebar-blonde-160x600"></div>
```


## License

MIT



