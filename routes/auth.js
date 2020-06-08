var express=require('express');
var router=express.Router();
var User=require('../models/user')
var passport=require('passport');

// ========AUTH =========
router.get('/register',function(req,res)
{
  res.render('register');
})


router.post('/register',function(req,res)
{
  var newuser=new User({username:req.body.username});
  User.register(newuser,req.body.password,function(err,user)
  {
    if(err)
    {
      req.flash("error",err.message);      
      return res.render('register');
    }
    else 
    {
      passport.authenticate("local")(req,res,function()
      {
        req.flash("success","Welcome To YELPCAMP Family");
        res.redirect('/campgrounds');
      })
    }
  })
});

router.get('/login',function(req,res)
{
  res.render('login');
})

//here we have sent the successredirect and failure redirect just t avoif the 401 messgae from passport in case of failure
router.post('/login',passport.authenticate('local',{
  successRedirect:'/campgrounds',
  failureRedirect:'/login'
}),function(req,res)
{})

// logout functionality
router.get('/logout',function(req,res)
{
  req.logout();
  res.redirect('/campgrounds');
})
module.exports=router;