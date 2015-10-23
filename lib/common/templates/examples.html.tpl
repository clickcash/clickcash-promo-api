﻿<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title><%- title %></title>
</head>
<body>


<h1>Retrieve specific promo By ID</h1>
<pre>
&lt;div data-clickcash="id=8219"&gt;&lt;/div&gt;
</pre>
<div data-clickcash="id=8219"></div>

<h1>Retrieve random promo by tags</h1>
<pre>
&lt;div data-clickcash="tag=250x250&tag=amateur"&gt;&lt;/div&gt;
</pre>
<div data-clickcash="tag=250x250&tag=amateur"></div>

<h1>Custom ART value (note that ART values are used for tracking performance in reports)</h1>
<pre>
&lt;div data-clickcash="tag=blonde&tag=160x600" data-clickcash-art="sidebar-blonde-160x600"&gt;&lt;/div&gt;
</pre>
<div data-clickcash="tag=blonde&tag=160x600" data-clickcash-art="sidebar-blonde-160x600"></div>

   
    <script type="text/javascript" src="../../dist/clickcashpromoapi/<%- version %>/clickcash-promo-api.js?pccacct=YOUR_ACCOUNT_CODE_HERE"></script>
    <!--<script type="text/javascript" id="clickcash-promo-api" src="https://images.ifriends.net/if_v2/clickcashpromoapi/<%- version %>/clickcash-promo-api.min.js?pccacct=YOUR_ACCOUNT_CODE_HERE&pmode=auto"></script>-->
</body>
</html>