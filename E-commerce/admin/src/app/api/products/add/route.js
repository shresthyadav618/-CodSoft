
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
connect();
await isAdminCheck();

export async function POST(NextRequest){
    try{
        const reqBody = await NextRequest.json();
    const {name,desc,price,images,parentCategory,properties} = reqBody;
    console.log(name,desc,price,images);
    console.log('THE PROPERTIES ARE  : ',properties);
    const newProduct = await new productModel({
        name : name,
        desc : desc,
        price: price,
        images : images,
        parentCategory : parentCategory === '' ? null : parentCategory,
        properties : properties
    });

    const savedProduct = await newProduct.save();
    console.log('new product has been added',savedProduct);
    return NextResponse.json({
        status : 200,
        savedProduct
    })
    }catch(err){
        return NextResponse.json({
            status : 500,
            error : 'there was some error while saving ur product',err
        })
    }
}