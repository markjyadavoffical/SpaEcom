import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItem:[
        {
            name:{type:String, required:true},
            qty:{type:Number, required:true},
            image:{type:String, required:true},
            price:{type:String, required:true},
            prodcut:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }

         }
    ],
    shippingAddress:{
        address:{type:String, required:true},
        city:{type:String, required:true},
        postalCode:{type:String, required:true},
        country:{type:String, required:true}

    },
    paymentMathods:{
        type:String,
        required:true
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        upadate_time:{type:String},
        email_address:{type:String}

    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        requrid:true,
        default:0.0
    },
    ispaid:{
        type:Boolean,
        required:true,
        default:false
    },
    padeAT:{
        type:Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
      deliveredAt: {
      type: Date,
    },

},
{
    timestamps:true
}
)

export const Order = mongoose.model("Order", orderSchema)