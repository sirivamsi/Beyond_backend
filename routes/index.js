var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var product=require('../models/product')
var user=require('../models/user')
var book=require('../models/book')
var complaint=require('../models/complaint')

//to add product into database
router.post('/product',(req,res)=>{

  var myproduct=new product(

    {
      productid:req.body.productid,
      productname:req.body.productname,
      productprice:req.body.productprice,
      productdesc:req.body.productdesc
    }
  )

  myproduct.save()
            .then((p)=>{res.send(p)})
            .catch((err)=>{console.log(err)})
})


//to add book into database
router.post('/book',(req,res)=>{

  var mybook=new book(

    {
      pid:req.body.pid,
      pimg:req.body.pimg,
      pgenre:req.body.pgenre,
      pname:req.body.pname,
      pprice:req.body.pprice,
      pauthor:req.body.pauthor,
      pabout:req.body.pabout
    }
  )

  mybook.save()
            .then((p)=>{if(p==null){res.send("-1")}else{res.send(p)}})
            .catch((err)=>{console.log(err)})
})

//to get all books from database
router.get('/allbooks',(req,res)=>{

  book.find({})
          .then((docs)=>{res.send(docs)})
          .catch((err)=>{console.log(err)})
})

//to get particular genre books

router.get('/genre/:genre',(req,res)=>{
    gen=req.params.genre
  if(gen==1){
      _genre="action"
  }
  else if(gen==2){
    _genre="rom"
}
else{
  _genre="Horror"
}
  book.find({pgenre:_genre}).select("pimg pname pprice pauthor pabout")
  .then((docs)=>{res.send(docs)})
  .catch((e)=>{res.send("-1")})
})


//to delete particular book
router.delete('/book/:id',(req,res)=>{

  pid=req.params.id
  book.findByIdAndDelete(pid)
      .then((p)=>{if(p==null){res.send("-1")}else{res.send(p)}})
      .catch((e)=>{console.log(e)})
})


//update book

router.put('/book',(req,res)=>{

  pid=req.body._id
  var pobj=new book(

  

    {

    _id:req.body._id,
    pid:req.body.pid,
      pimg:req.body.pimg,
      pgenre:req.body.pgenre,
      pname:req.body.pname,
      pprice:req.body.pprice,
      pauthor:req.body.pauthor,
      pabout:req.body.pabout

  })

  book.findByIdAndUpdate(pid,pobj)
  .then((r)=>{if(r==null)
  {
    res.send("-1")
  }
  else{
    res.send(r)
  }
  })

})

//to get all products from db
router.get('/allproducts',(req,res)=>{

  product.find({})
          .then((docs)=>{res.send(docs)})
          .catch((err)=>{console.log(err)})
})


//to register user into db
router.post('/user',(req,res)=>{


  var myuser=new user(
    {
      userid:req.body.userid,
      username:req.body.username,
      userpwd:req.body.userpwd
    }
  )

  myuser.save()
      .then((u)=>res.send("1"))
      .catch((e)=>console.log(e))
})


//to get all users from db
router.get('/allusers',(req,res)=>{

  user.find({})
      .then((docs)=>{res.send(docs)})
      .catch((err)=>{console.log(err)})
})


//to check login credentials match with registration credentials
router.post('/login',(req,res)=>{

  var uname=req.body.username;
  var pwd=req.body.userpwd;
  
  user.findOne({username:uname}).select('_id userid username userpwd')
      .then((u)=>{
        userobj=u
       if(u==null){
        res.send("0")}
        else{
         
          if(pwd==u.userpwd){
            res.send(u)
          }
          else{
            res.send("-1")
          }
        }
       }
        )
      
      .catch((e)=>console.log(e))
})


//to delete particular product
router.delete('/deleteproduct/:id',(req,res)=>{

  var pid=req.params.id
  product.findByIdAndDelete(pid)
        .then((p)=>{res.send(p)})
        .catch((e)=>{console.log(e)})

})


//to find particular id of the product

router.post('/findid',(req,res)=>{

  pid=req.body.pid,
  pimg=req.body.pimg,
  pgenre=req.body.pgenre,
  pname=req.body.pname,
  pprice=req.body.pprice,
  pauthor=req.body.pauthor,
  pabout=req.body.pabout

  book.findOne({pid:pid,pimg:pimg,pgenre:pgenre,pname:pname,pprice:pprice,pauthor:pauthor,pabout:pabout}).select("_id")
  .then((p)=>{if(p==null){res.send("-1")}else{res.send(p._id)}})
  .catch((e)=>{console.log(e)})

})

//to update particular product
router.put('/updateproduct/:id',(req,res)=>{

  var pid=req.params.id;

  var myproduct=new product(
    {
      _id:pid,
      productid:req.body.productid,
      productname:req.body.productname,
      productprice:req.body.productprice,
      productdesc:req.body.productdesc
    }
  )

  product.findByIdAndUpdate(pid,myproduct)
          .then((p)=>{res.send(p)})
          .catch((e)=>{console.log(e)})
})


//to retrieve particular product
router.get('/product/:id',(req,res)=>{

  var pid=req.params.id;
  product.findOne({_id:pid}).select('_id productid productname productprice productdesc')
  .then((p)=>{res.send(p)})
  .catch((e)=>{console.log(e)})
})


//to register a complaint from contact form

router.post('/complaint',(req,res)=>{

var mycom=new complaint(

  {
    "username":req.body.username,
    "phone":req.body.phone,
    "email":req.body.email,
    "msg":req.body.msg
  }
)

mycom.save()
.then((c)=>{res.send(c)})
.catch((e)=>{res.send("-1")})

})