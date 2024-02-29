const express=require("express");
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 3000;

app.use(express.json());

const blog=require("./routes/Blog")

app.use("/api/v1",blog);

const connectWithDb=require("./config/Database");
connectWithDb();

app.listen(PORT,()=>{
    console.log("app is running successfully");
})

app.get('/',(req,res)=>{
    res.send("<h1>This is my homepage</h1>")
})