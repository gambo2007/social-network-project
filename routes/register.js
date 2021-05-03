var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var passport = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override');
const user = require('../models/user');

router.get('/', (req, res) => {
    res.render('register.ejs')
  })
var users =[]
router.post('/', async (req, res) => {
try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
    id: Date.now().toString(),
    username: req.body.username,
    password: hashedPassword
    })
    res.redirect('/login')
} catch {
    res.redirect('/register')
}
console.log(users)
})



module.exports = router;