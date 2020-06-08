var mongoose=require("mongoose");

var campground_schema= new mongoose.Schema(
    {
        name:String,
        url:String,
        description:String,
        price:String,
        comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"comments"
            }
        ],
        author:{
            username:String,
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"comments"
            }
        }
    });

var campgrounds=mongoose.model("campgrounds",campground_schema);
module.exports =campgrounds