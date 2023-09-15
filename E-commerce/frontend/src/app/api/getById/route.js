
import { connect } from "@/dbConfig/dbConfig";
import { productModel } from "@/models/productsModel";
import { NextResponse } from "next/server";

await connect();
export async function POST(NextRequest){
   
    try{
        const reqBody = await NextRequest.json();
        console.log(reqBody);
        const {ids} = reqBody;
       
        const products = await Promise.all(ids?.map(async(_id)=>{
            const gotProduct = await productModel.findById(_id);
            return gotProduct;
        }))
        
        
        return NextResponse.json({
            status : 200,
            products 
        })
    }catch(err){
        
        
        return NextResponse.json({
            status : 500,
            error : 'There was some error getting back the product'
        })
    }

}
