var mongoose=require("mongoose");
var campgrounds=require("./models/campground");
var comments=require("./models/comments");

data=[
    {
        name:"ScotGoodhill",
        url:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        name:"Blazetower",
        url:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        name:"IroonMan Camp",
        url:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },

]

function Seed()
{
    campgrounds.find({}).remove(function(err)
    {
        // if(err)
        //   console.log(err);
        // else 
        // {
        //     console.log("Campgrounds Removed");
        //     data.forEach(function(camp)
        //     {
        //         campgrounds.create(camp,function(err,camp)
        //         {
        //             if(err)
        //              console.log(err);
        //             else 
        //             {
        //               console.log(camp);
        //               // now we need to create a comment
        //               comments.create({
        //                   text:"This is one of the most beautiful place I have seen ever in my life",
        //                   author:"Colt Stelle"
        //               },function(err,comment)
        //               {
        //                   if(err)
        //                    console.log(err);
        //                   else 
        //                    {
        //                        camp.comments.push(comment);
        //                        camp.save();
        //                        console.log("campground added");
        //                    }
        //               })
        //             }
        //         })
        //     })
        // }
    })
};

module.exports=Seed;