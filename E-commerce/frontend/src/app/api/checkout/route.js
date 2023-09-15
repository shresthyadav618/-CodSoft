import { connect } from "@/dbConfig/dbConfig";
import { orderModel } from "@/models/order";
import { NextResponse } from "next/server";
await connect();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
export async function POST(NextRequest){

try{
    const reqBody = await NextRequest.json() ;
    const {cartProducts , city , country , email , name , postalCode, streetAddress , products} = reqBody;
    console.log('GOT ALL DETAILS INSIDE CHECKOUT ROUTE HANDLER',cartProducts , city, country , email , postalCode , streetAddress , name , products);
    
    const uniqueProductId = [...new Set(cartProducts)];
    
    let line_items = [];
    for(const productId of uniqueProductId){
        const productInfo = await products.find(p=> p._id === productId);
        const quantity = cartProducts.filter((p)=>{return p === productId}).length || 0;
        if(quantity > 0 && productInfo){
            console.log('the product price is ' + productInfo.price*quantity);
            // const totalPrice = productInfo.price*quantity;
            line_items.push({
                quantity,
                price_data : {
                    currency : 'INR',
                    product_data : {name : productInfo.name},
                    unit_amount : productInfo.price *100,
                }
            });
        }
    }
    

    const newOrder = new orderModel({
        line_items , city , country , email , name , postalCode, streetAddress , paid:false
    });
    const newOrderSave = await newOrder.save();
    console.log('the new order is saved');
  
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode : 'payment',
        customer_email : email,
        success_url : process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url : process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata : {orderId : newOrderSave._id , test:'OK'}
    })

    return NextResponse.json({
        status : 200,
        url : session.url
    })
}catch(err){
console.log('INSIDE THE CHECKOUT API ROUTE HANDLER , GOT ERROR',err);
return NextResponse.json({
status : 404,
error : err
})
}

}