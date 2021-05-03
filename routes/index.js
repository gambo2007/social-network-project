var express = require('express');
var router = express.Router();
var app = require('../app');
var expressLayouts = require('express-ejs-layouts');
const { route } = require('./users');


const Article = require('./../models/article')
router.use(expressLayouts)

/* GET home page. */
router.get('/', async function (req, res) {
    try {
        let articles = await Article.find();
        articles = articles.reverse()
        res.render('index', { articles });
    } catch (err) {
        console.log(err)
    }

});





module.exports = router;