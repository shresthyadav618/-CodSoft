
import { connect } from "@/dbConfig/dbConfig";
import { categoriesSchema } from "@/models/categories";
import { productModel } from "@/models/productModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
await isAdminCheck();
await connect();
export async function POST(NextRequest){
   
    try{
        const reqBody = await NextRequest.json();
        console.log(reqBody);
        const {_id} = reqBody;
        const product = await productModel.findById(_id);
        const x =  mongoose.models.categories || mongoose.model('categories',categoriesSchema) ;
        
        if(product){
            console.log('found the product',product);
            console.log('TRYING TO POPULATE PARENT CATEGORY');
            
            await product?.populate('parentCategory');
            console.log('AFTER POPULATING WITH PARENT CATEGORY' , product);
            return NextResponse.json({
                status : 200,
                product
            })
        }else{
            return NextResponse.json({
                status : 500,
                error : 'unable to find the product'
            })
        }

    }catch(err){
        
        console.log('the error is : : : : :: : : ',err);
        return NextResponse.json({
            status : 500,
            error : 'There was some error getting back the product'
        })
    }

}
