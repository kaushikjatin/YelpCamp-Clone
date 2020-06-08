var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require("mongoose");
var passport=require('passport');
var LocalStrategy=require('passport-local');// we need to configure the strategy too before using passport..so we need to import it.
var User=require('./models/user');
var commentroute=require('./routes/comments');
var authroute=require('./routes/auth');
var campgroundroute=require('./routes/campgrounds');
var methodOverride=require('method-override');
var flash=require('connect-flash');

mongoose.connect('mongodb://localhost/yelp_camp');
var campgrounds=require("./models/campground");
var comments=require("./models/comments");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(require('express-session')
({
    secret:"Rusty is a very adorable dog",
    resave:false,
    saveUninitialized:false
}));
app.use(methodOverride('_method'))
app.use(flash());

// Middleware

// In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. 
// If your application uses persistent login sessions, passport.session() middleware must also be used.

//IMPORTANT
// passport.initialize() and passport.session() are invoked on each request and they are the ones that cause serializeUser to load the user id to req.user if a serialized user is found in the server (when using mongodb, if the user exist in mongodb).

// passport.session() calls deserializeUser on each request, which queries the mongodb using the user._id that was initially loaded to req.user by serializeUser and stores the more information about user in the req.user.

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next)
{
  res.locals.user=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});


// Three pieces need to be configured to use Passport for authentication:

// Authentication strategies
// Application middleware
// Sessions (optional)

//This example introduces an important concept. Strategies require what is known as a verify callback. The purpose of a verify callback is to find the user that possesses a set of credentials.
//When Passport authenticates a request, it parses the credentials contained in the request. 
//It then invokes the verify callback with those credentials as arguments, in this case username and password. 
//If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.

// HERE THE CALLBACK IS SERVED BY THE USER.authenticate()..IF WE WOULDN'T HAD THIS FUNCTION THEN WE WOULD HAVE TO WRITE 20-30 LINES OF NEW FUNCTION
passport.use(new LocalStrategy(User.authenticate())) 

// we have used the serialize and deserialize user because of the following reason.
// In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request.
//  If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

// Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. 
// In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//  var Seed=require("./seed");
//  Seed();

app.get('/',function(req,res)
{
    res.render('landing_page');
})

app.use(campgroundroute);
app.use(commentroute);
app.use(authroute)

app.listen(3000);
