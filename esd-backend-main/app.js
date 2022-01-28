var express = require("express")
var app = express();
var user = require("./model");

app.use(express.json());

var cors = require("cors");
app.use(cors());
app.route("/user/:id")
.get(async (req,res)=>{
    console.log(req.params.id);
    let data = await user.find({_id:req.params.id});
    res.send(data);
})
app.route("/user")
.get(async (req,res) =>{
    let data = await user.find();
    console.log(data);
    res.send(data);
})
.post(async (req,res) =>{
    // req_data=req.query;
    req_data=req.body;
    let data = new user(req_data);
    let newData = await data.save();
    console.log(data);
    res.send(newData);
})
.put(async (req,res) =>{
    //  req_data=req.query;
     req_data=req.body;
    let updateData = await user.updateOne({_id:req_data.id},{$set:{name:req_data.name,age:req_data.age,city:req_data.city}});
    res.send(updateData);
})
.delete(async (req,res) =>{
    let data = await user.deleteOne({_id:req.body.id});
    res.send(data);
})
app.listen(process.env.PORT || 2302,()=>{
    console.log("Listenng on port 2302");
})