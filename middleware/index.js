var middlewares={};
var comments=require("../models/comments");
var campgrounds=require("../models/campground");

middlewares.checkcommentauthorization=function(req,res,next)
{
    if(req.isAuthenticated())
  {
    comments.findById(req.params.comment_id,function(err,foundcomment)
    {
      if(err)
      res.redirect('back');
      else 
      {
        if(req.user._id.equals(foundcomment.author.id))
          next();
        else 
        {
          req.flash("error","You are not authorizes to do that!");
          res.redirect('..');
        }
      }
    })
  }
  else 
  {
    req.flash("error","Please Login To Make Changes!");
    res.redirect('back');
  }
}


middlewares.checkcampgroundauthorization=function(req,res,next)
{
    if(req.isAuthenticated())
  {
    campgrounds.findById(req.params.id,function(err,foundcampground)
    {
      if(err)
        res.redirect('back');
      else 
      {
        if(req.user._id.equals(foundcampground.author.id))
          next();
        else 
        {
          req.flash("error","You are not authorizes to do that!");
          res.redirect('back');
        }
      }
    })
  }
  else 
  {
    req.flash("error","Plase Login To Make Changes!");
    res.redirect('back');
  }
}


middlewares.isLoggedin=function(req,res,next)
{
    if(req.isAuthenticated())
    return next();
    req.flash("error","Please Login First!");
    res.redirect('/login');
}


module.exports=middlewares;