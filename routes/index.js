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
        const article = await Article.find();
        res.render('index', { article });
    } catch (err) {
        console.log(err)
    }

});
router.get('/inform', (req, res) => {
    res.render('inform')
})



module.exports = router;