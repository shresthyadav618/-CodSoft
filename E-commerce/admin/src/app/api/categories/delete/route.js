
import { categoriesModel } from "@/models/categories";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
await isAdminCheck();
export async function POST(NextRequest){
    try{
        connect()
        console.log('will be inside the delete request');
        const reqBody = await NextRequest.json();
        const { _id } = reqBody;
        console.log('the deleted cat id is : ',_id);
        const category = categoriesModel.findById(_id);
        if(category){
            const deleteCategory = await category.deleteOne();
            console.log('deleted the category',deleteCategory);
            return NextResponse.json({
            status : 200,
            deleteCategory
            })
        }else{
            return NextResponse.json({
                status : 500,
                error : 'Unable to find the category by id'
            })
        }
        
    }catch(error){
        console.log('THE ERROR IS : ',error)
            return NextResponse.json({
            status : 500,
            error : error
        })
    }
}