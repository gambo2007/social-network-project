require('dotenv').config()
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article")
var informRouter = require("./routes/inform")

var Register = require("./routes/register")
require("./passport-setup")
var passport              =  require("passport")
var bodyParser            =  require("body-parser")
var LocalStrategy         =  require("passport-local")
var passportLocalMongoose =  require("passport-local-mongoose")
var User                  =  require("./models/user")




// setup mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// static files
var app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// view engine setup

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));
app.set("layout", "./layouts/layout")
app.set("javascripts", "./javascripts/fileUpload")


app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));



passport.serializeUser(User.serializeUser()); //encrypt
passport.deserializeUser(User.deserializeUser()); //decrypt
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

// routes

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
    username: req.body.username
});
});
app.use("/", indexRouter);

app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login"
}),function (req, res){
});
app.get('/successtoprofile', isLoggedIn, (req, res) =>{
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/successtoprofile');
  }
);


app.use("/register",Register);
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/login");
});



app.use("/users", usersRouter);


function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.use("/articles", articleRouter)
app.use("/informs", informRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



module.exports = app;