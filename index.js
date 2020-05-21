const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const urlSchema=require('./models/urlSchema');
const hourSchema=require('./models/hourSchema');
const app=express();
app.set('view engine','ejs');

const mongoURI = "mongodb://localhost/urlshortnerdb";
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
  };
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, er);
    console.log(`Connected to MongoDB`);
  });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',async(req,res)=>{
    const url=await urlSchema.find();
    res.render('index',{url:url});
});

app.post('/urlshorten',async(req,res)=>{
    let hourData=await hourSchema.findOne({year:new Date().getFullYear(),month:new Date().getMonth(),day:new Date().getDay(),hour:new Date().getHours()},function(err,hour){
        if(err){
            console.log("error");
        }
    });
    if(!hourData){
        let hdata=new hourSchema({
            hour:new Date().getHours()
        });
        hdata.save(function(err,h){
            console.log("hour data sucessfully saved");
        });

    }
    else{
        hourData.visits=hourData.visits+1;
        hourData.save(function(err,h){
            console.log("Visit of hour incremented:"+hourData.visits);
        });
    }
    let urlData=await urlSchema.findOne({url:req.body.url},function(err,url){
        if(err){
            console.log("error");
        }
    });
    if(!urlData){
        let url=new urlSchema({
            url: req.body.url
        });
        
        await url.save(function(err,url){
            console.log("Sucessfully saved");
            res.send("Your Short URL is:"+url.shortUrl);
        });
    }
    else{
        console.log(urlData.url);
        urlData.visits=urlData.visits+1;
        console.log("visits:"+urlData.visits);
        await urlData.save(function(err,url){
            console.log("Sucessfully Saved");
        });
        res.send("Your Short URL is:"+urlData.shortUrl);
    }
});

app.get('/:shortUrl',async(req,res)=>{
    const shortUrl=await urlSchema.findOne({shortUrl: req.params.shortUrl});
    if(shortUrl==null){
        res.sendStatus(404);
        res.send("Page not FOUND");
    }else{
    res.redirect(shortUrl.url);
    }
    
});

app.get('/graph',async(req,res)=>{
    const graphData=hourSchema.find({year: new Date().getFullYear(),month:new Date().getMonth(),day:new Date().getDay()});
    if(graphData==null){
        res.send("Current Day Data not available");
    }
    else{
        res.render('graph',{graphData:graphData});
    }
});

app.listen(3000,()=>{
    console.log("app running on PORT 3000");
});

