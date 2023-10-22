var mongo=require('mongoose')

var schema=mongo.Schema

var bookschema=new schema(

    {
        pid:String,
        pimg:String,
        pgenre:String,
        pname:String,
        pprice:String,
        pauthor:String,
        pabout:String
    }
)

var books=mongo.model('Book',bookschema)

module.exports=books;