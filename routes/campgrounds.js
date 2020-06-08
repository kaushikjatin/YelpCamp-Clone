var express=require('express');
var router=express.Router();
var campgrounds=require("../models/campground");
var middleware=require("../middleware");

// ===========campgrounds==============
router.get('/campgrounds',function(req,res)
{
    campgrounds.find({},function(err,allcampgrounds)
    {
        var message=req.flash("error");
        if(message.length>0)
          req.flash("error",req.flash("error"));

        message=req.flash("success");
        if(message.length>0)
          req.flash("success",req.flash("success"));

        if(err)
          console.log("found a error");
        else 
          res.render('campgrounds/index',{arr:allcampgrounds});
    })
    
})

router.post('/campgrounds',middleware.isLoggedin,function(req,res)
{
    var author={
      username:req.user.username,
      id:req.user._id
    };
    var newcamp={'name':req.body.name,'url':req.body.url,'price':req.body.price,'description':req.body.description,author:author};
    campgrounds.create(newcamp,function(err,campground)
    {
        if(err)
        {
          req.flash("error","Something Went Wrong");
          res.redirect("back");
        }
        else 
        {
          req.flash("success","Campground Added Successfully."); 
          res.redirect('/campgrounds');
        }
    })
}) 


router.get('/campgrounds/new',middleware.isLoggedin,function(req,res)
{
    res.render('campgrounds/new');
})

router.get('/campgrounds/:id',middleware.isLoggedin,function(req,res)
{
    campgrounds.findById(req.params.id).populate("comments").exec(function(err,campground)
    {
        if(err)
        {
          req.flash("error","Something Went Wrong");
          res.redirect("back");
        }
        else 
          res.render('campgrounds/show',{campground:campground});
    })
})

// Editing the campground....
router.get('/campgrounds/:id/edit',middleware.checkcampgroundauthorization,function(req,res)
{
  campgrounds.findById(req.params.id,function(err,campground)
  {
    res.render("campgrounds/edit",{campground:campground});
  })
})

router.put('/campgrounds/:id',middleware.checkcampgroundauthorization,function(req,res)
{
  campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground)
  {
    if(err)
    {
          req.flash("error","Something Went Wrong");
          res.redirect("/campgrounds/"+req.params.id);
    }
    else 
    {
      req.flash("success","Campground Succesfully Updated");
      res.redirect('/campgrounds/'+ req.params.id);
    }
  })
})

// Destroying the campground
router.delete('/campgrounds/:id',middleware.checkcampgroundauthorization,function(req,res)
{
    campgrounds.findByIdAndDelete(req.params.id,function(err)
    {
      if(err)
      {
          req.flash("error","Something Went Wrong");
          res.redirect("/campgrounds/"+req.params.id);
      }
      req.flash("success","Campground Deleted!");
      res.redirect('/campgrounds');   
    })
})


module.exports=router;