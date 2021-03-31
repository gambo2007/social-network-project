var express = require('express');
var router = express.Router();
var app = require('../app');
var expressLayouts = require('express-ejs-layouts');
const { route } = require('./users');
var dateformat = require("dateformat")
const Article = require('./../models/article')
router.use(expressLayouts)

/* GET home page. */
router.get('/', async function (req, res) {
    try {
        let article = await Article.find();
        article = article.reverse()
        res.render('index', { article });
    } catch (err) {
        console.log(err)
    }

});
router.get('/inform', (req, res) => {
    res.render('inform')
})



module.exports = router;