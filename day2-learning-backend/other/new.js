const express=require('express');
const { default: mongoose, Schema } = require('mongoose');

const schema=mongoose.schema;
const objectId=mongoose.objectId;

const User=new Schema({
    name:{type:string,require:true},
    email:{type:string},
    password:{type:string}
})

const Todo=new Schema({
    userId:objectId,
    title:string,
    description:string,
})

const userModel=mongoose.model({'users':User});
const todoModel=mongoose.model({'todos':Todo});