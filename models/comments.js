var mongoose=require("mongoose");

var commentschema=new mongoose.Schema({
    text:String,
    author:{
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments"
        }
    }
});

module.exports=mongoose.model("comments",commentschema);
