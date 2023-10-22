var mongo=require("mongoose")

var schema=mongo.Schema

var complaintschema=new schema(

    {
        "username":String,
        "phone":Number,
        "email":String,
        "msg":String
    }
)

var  mycom=mongo.model("complaints",complaintschema)

module.exports=mycom