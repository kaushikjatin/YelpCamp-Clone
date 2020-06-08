var express=require('express');
var router=express.Router();
var campgrounds=require("../models/campground");
var comments=require("../models/comments");
var middlewares=require("../middleware");
// ========comments =============
router.get("/campgrounds/:id/comments/new",middlewares.isLoggedin,function(req,res)
{
  campgrounds.findById(req.params.id,function(err,campground)
  {
    if(err)
     console.log(err);
    else 
    {
      res.render('comments/new',{campground:campground});
    }
  })
})

router.post("/campgrounds/:id/comments/new",middlewares.isLoggedin,function(req,res)
{
  comments.create(req.body.comment,function(err,comment)
  {
    if(err)
     console.log(err);
    else 
     {
         comment.author.username=req.user.username;
         comment.author.id=req.user.id;
         comment.save();
       campgrounds.findById(req.params.id,function(err,campground)
       {
         if(err)
          console.log(err);
         else 
         {
           campground.comments.push(comment);
           campground.save();
           res.redirect("/campgrounds/"+req.params.id);
         }
       })
     }
  });
})

router.get("/campgrounds/:id/comments/:comment_id/edit",middlewares.checkcommentauthorization,function(req,res)
{
      comments.findById(req.params.comment_id,function(err,comment)
      {
        if(err)
          console.log(err);
        else  
          res.render("comments/edit",{campground_id:req.params.id,comment:comment});
      })
})


router.put("/campgrounds/:id/comments/:comment_id",middlewares.checkcommentauthorization,function(req,res)
{
  comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment)
  {
    if(err)
    {
      res.redirect("/campgrounds/"+req.params.id);
    }
    else 
      res.redirect("/campgrounds/"+req.params.id);
  })
})

router.delete("/campgrounds/:id/comments/:comment_id",middlewares.checkcommentauthorization,function(req,res)
{
  comments.findByIdAndDelete(req.params.comment_id,function(err)
  {
    if(err)
       res.redirect("back");
    else
       res.redirect("/campgrounds/"+req.params.id);
  })
})

module.exports=router;