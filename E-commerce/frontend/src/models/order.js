import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
 line_items : {
    type : Object,
 },
 name : {
    type: String,
 },
 email : {
    type: String,
 },
 city : {
    type: String,
 },
 postalCode : {
    type: String,
 },
 streetAddress : {
    type: String,
 },
 country : {
    type: String,
 },
 paid : {
    type : Boolean
 }
},{
  timestamps : true ,
});

export const orderModel = mongoose.models.orders || mongoose.model('orders',orderSchema);