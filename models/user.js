var mongo=require('mongoose')

var schema=mongo.Schema

var userschema=new schema(

    {
        userid:String,
        username:String,
        userpwd:String
    }
)

var users=mongo.model('User',userschema)

module.exports=users