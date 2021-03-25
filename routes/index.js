var express = require('express');
var router = express.Router();
var app = require('../app');
var expressLayouts = require('express-ejs-layouts');
const { route } = require('./users');
router.use(expressLayouts)

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

router.post('/', function (req, res){
    res.send("OK")
});

module.exports = router;