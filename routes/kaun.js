const express = require('express');
const router = express.Router();
const {User} = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
router.get("/kaun" , async(req ,res)=>{

    const varify = jwt.verify(req.body,JWT_SECRET);
    const id = varify._id;
  const data = await User.findById(id);
  res.status(200).json({
    "Data":data
  })


})