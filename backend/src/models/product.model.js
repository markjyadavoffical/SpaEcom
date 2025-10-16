import mongoose, { Schema } from "mongoose";

const review = new Schema({
    name:{type:String, required:true},
    rating:{type:Number, required:true, default:0},
    comment:{type:String, required:true},
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }   
    
},
{timestamps:true})

const ProudctSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity : {
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    reviews:[review],
    description: { type: String, required: true },
    ating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
},
{timestamps:true})


export const Product = mongoose.model("Product", ProudctSchema)