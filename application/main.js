var express= require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var mongoose=require('mongoose');
var Products=require('./datas/product-data.js')
var Copied=require('./datas/copieddata');
mongoose.connect('mongodb://localhost/filename');
app.get('/data',function(req,res)
{
    res.send(" your name is vignesh");
})
app.post('/data',function(req,res)
{
       var product=new Products();
       product.item=req.body.item;
       product.name=req.body.name;
    product.save(function(err,saveddata)
    {
        if(err)
        {
            res.status(500).send({error:"you have a problem on your inputs"});
        }
        else{
            res.send(saveddata);
        }
    });
})
app.get('/data/view',function(req,res)
{
    Products.find({},function(err,allData)
    {
        if(err){
            res.status(500).send({error:"your program has an error"});
        }else{
            res.send(allData);
        }
    })
})
app.post('/data/copies',function(req,res)
{
    var copied=new Copied();
    copied.title=req.body.title;
    copied.save(function(err,allData)
    {
        if(err){
            res.status(500).send({error:"you have a problem on data/copies"});
        }else{
            res.send(allData);
        }
    })
})
app.get('/data/copies/view',function(req,res)
{
    Copied.findOne({}).populate({path:'copy',model:'Product'}).exec(function(err,allData){
        if(err){
            res.status(500).send({error:"you have a proble with fetching and view the data on data/copies/view"});
        }else{
            res.send(allData);
        }
    })
})
app.put('/data/copies/view/add',function(req,res)
{
    Products.findOne({_id:req.body.productid},function(err,Product)
    {
        if(err){
            res.status(500).send({error:"your data has some problem on fetching with a another dataset"});
        }else{
            Copied.updateMany({_id:req.body.copyid},{$addToSet:{copy:Product._id}},function(err,alldata){
                  res.send(alldata);
            });
        }
    })
});
//litening port
var port =8000;
app.listen(port,function(req,res){
    console.log(" your code is runing on "+port);
})