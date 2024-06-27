import mongoose, { Schema, Document } from 'mongoose';
import { IPayment } from './payment.interface';
const paymentSchema: Schema = new Schema({
    name:{type:String},
    email:{type:String,required:true},
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    customer_id:{type:String,required:true},
    payment_id:{type:String,required:true},
    brand:{type:String},
    expiredDate:{type:String},
    productDetails:{type:String}
  },{
    timestamps:true
  });
  
 
export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);