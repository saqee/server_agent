const  express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const pp=require('express-fileupload')
const fs=require('fs-extra')
const bodyParser=require('body-parser')
const ServiceModel=require('./model/service')
const fileUpload = require('express-fileupload')
const { findByIdAndDelete } = require('./model/service')
app.use(cors())
app.use(express.json())
app.use(express.static('services'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(fileUpload())
require('dotenv').config()


//mongoose.connect('mongodb+srv://saqeeb:saqeeb@cluster0.euyqv.mongodb.net/service1?retryWrites=true&w=majority',{
  //  useNewUrlParser:true,useUnifiedTopology: true
//}).then(result=>{
  //  console.log('db connect');
//})



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.euyqv.mongodb.net/${process.env.DB_DbName1}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("work").collection("works");

  app.post('/service',(req,res)=>{
    
    const file=req.files.file;
    const name=req.body.name;
    const description=req.body.description
    const email=req.body.email
    const price=req.body.price
    
    const newImg=req.files.file.data
    const encImg=newImg.toString('base64')
    const image={
      contentType:file.mimetype,
      img:Buffer.from(encImg,'base64')
    }
    collection.insertOne({name,description,img:file.name,email,price})
   })
app.get('/read',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})
  
});


const uri2 = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.euyqv.mongodb.net/${process.env.DB_DbName2}?retryWrites=true&w=majority`;

client.connect(err => {
  const companies = client.db("company").collection("companies");

  app.post('/company',(req,res)=>{
    const employee=req.files.employee
    const name=req.body.name
    const position=req.body.position
    const description=req.body.description

  
    
    const newImg=req.files.employee.data
    const encImg=newImg.toString('base64')
    var image={
      contentType:employee.mimetype,
      img:Buffer.from(encImg,'base64')
    }
    
    companies.insertOne({name,position,description,image})
  })

  app.get('/readcompany',(req,res)=>{
    companies.find({})
    .toArray((err,document)=>{
        res.send(document)
    })
  })
});
//adminpanel

const uri3 = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.euyqv.mongodb.net/${process.env.DB_DbName3}?retryWrites=true&w=majority`;

const client3 = new MongoClient(uri3, { useNewUrlParser: true });
client3.connect(err => {
  const collection = client3.db("adminpanel").collection("adminpanels");

  app.post('/companyservice',(req,res)=>{
    
    const file=req.files.file;
    const name=req.body.name;
    const description=req.body.description
    
    const newImg=req.files.file.data
    const encImg=newImg.toString('base64')
    var image={
      contentType:file.mimetype,
      size:file.size,
      img:Buffer.from(encImg,'base64')
    }
    
    collection.insertOne({name,description,image})
   })
app.get('/read1',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
        res.send(documents)
    })
})
  
});
  
app.listen(process.env.PORT || 3001,()=>{
    console.log('running an');
})