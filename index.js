const express=require('express');
const app=express();

app.get('/',async(req,res)=>{
    res.send("Welcome to URL Shortner");
});

app.listen(3000,()=>{
    console.log("app running on PORT 3000");
});

