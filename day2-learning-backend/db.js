const mongoose=require('mongoose');

exports.connectMongoose=()=>{
    mongoose.connect("mongodb://localhost:27017").then((e)=>{
        console.log('mongodb connected');
    })
    .catch((e)=>{
        console.log('mongodb not connected');
    })
}