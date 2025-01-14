const mongoose= require("mongoose");
const express = require("express");

const userSchema= mongoose.Schema({
 fullName:{
    type:String,
    required:true,
    minLength: 3,
 },
 email:{
    type:String,
    required:true,
    unique:true,
 },
 password:{
    type:String,
    required:true,
    minLength: 8,
 },
 OrderDetails:{
   type:[String],
 }
},{
    timestamps:true
});

const userModel= mongoose.model("userdata",userSchema);

module.exports=userModel