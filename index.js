const dotenv = require("dotenv")
dotenv.config();
// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const { User, Account } = require('./db');
const  jwt  = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const {connectDatabase} = require('./db');


const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
app.post("/api/v1/user/kaun" ,async(req,res)=>{
   const token = req.body.token;

  try {
    const userId = jwt.verify(token , JWT_SECRET);
    if(!userId){
        console.log(userId);
        return
    }
    const id = userId.userId;
   
    const user  = await User.findById(id);
    // const userid = user;
    // console.log(userid);
    const response =  await Account.find({userId:id})
    if( response ){
        console.log(response);
        res.status(200).json({
            "Data":response
        })
    }
 
  } catch (error) {
    console.log(error.message);
  }

//    User.findById()


})

app.listen(process.env.PORT,()=>{
  console.log(`we are listening at ${process.env.PORT}`)
});