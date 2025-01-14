const express = require("express");
const mongoose = require("mongoose");


const orderSchema=mongoose.Schema({
    ColorInfo:{
        type:String,
        required:true,
    },
    ROmINfro:{
        type:String,
        required:true,
    },
    PaymentType:{
        type:String,
        required:true,
    },
    AddressINfo:{
        type:String,
        required:true,
    },
    OrderId:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const orderModel= mongoose.model("orders",orderSchema);


module.exports=orderModel