
// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://pooja:pooja@cluster0.81kygrb.mongodb.net/ddash?retryWrites=true&w=majority",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => { console.log('connected'); })
//     .catch((err) => {
//         console.log("Not Connected");
//     })

// const express = require('express')
// const mongoose = require('mongoose')
// 
// mongoose.connect(" ",{
//         useNewUrlParsee: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log("CONNECTION OK");
//     }).catch(err => {
//         console.log("CONNECTION IS BAD");
//     });
const mongoose=require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Sushantpooja:dq9GF0M2pd0FwOJ4@cluster0.mwdfl.mongodb.net/ddash?retryWrites=true&w=majority",
  {
    useNewUrlParser:true,
    useUnifiedTopology: true
  }
).then(() => {
            console.log("CONNECTION OK");
        }).catch(err => {
            console.log("CONNECTION IS BAD");
            console.log(process.env.MONGODB_URL)
            console.log(process.env.KEY)

        });