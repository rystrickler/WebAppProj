var express = require('express');
var bodyParser = require('body-parser');

var routes = require("./routes");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('./public'));
app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port);
