const mongoose=require('mongoose')

const ServiceSchema=new mongoose.Schema({
name:{
    type:String,
},
description:{
    type:String,
},
image:{
    type:String,
},
})

const service=mongoose.model("service",ServiceSchema)

module.exports=service