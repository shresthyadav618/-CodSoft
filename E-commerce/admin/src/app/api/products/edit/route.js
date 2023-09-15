import { connect } from "@/dbConfig/dbConfig";
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
await isAdminCheck();
await connect();
export async function PUT(NextRequest){
    try{
        const reqBody = await NextRequest.json();
    console.log(reqBody);
    const {name,desc,price,_id,images,ParentCategory,properties} = reqBody;

    console.log('inside edit',name,desc,price,_id,images);
    const product = await productModel.findById(_id);
    if(product){
        const updatedProduct = await product.updateOne({
            name : name,
            desc : desc,
            price : price,
            images : images,
            parentCategory : ParentCategory === '' ? null : ParentCategory,
            properties : properties
        });
        console.log('updated product is :',updatedProduct);
        if(updatedProduct){
            return NextResponse.json({
                status :200,
                updatedProduct
            })
        }else{
            return NextResponse.json({
                status : 500,
                error : 'some error updating the product'
            })
        }
    }else{
        return NextResponse.json({
            status : 500,
            error : 'some error getting the product'
        })
    }
    }catch(err){
        console.log('some error',err);
        return NextResponse.json({
            status : 500,
            error : 'some error',err
        })
    }
    
}