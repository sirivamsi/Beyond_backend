var mongo=require('mongoose')

var schema=mongo.Schema

var productschema=new schema(

    {
        productid:String,
        productname:String,
        productprice:String,
        productdesc:String
    }
)

var products=mongo.model('Product',productschema)

module.exports=products;