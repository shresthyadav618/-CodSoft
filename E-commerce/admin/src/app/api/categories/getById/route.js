import { categoriesModel } from "@/models/categories";
import { NextResponse } from "next/server";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
await isAdminCheck();
export  async function POST(NextRequest){
    try{
        
        const reqBody = await NextRequest.json();
        const {id} = reqBody;
        console.log('the id is : ',id)
        const category = await categoriesModel.findById(id);
        if(category){
            return NextResponse.json({
                status : 200,
                category
            })
        }else{
            return NextResponse.json({
                status : 500,
                error : 'no such category found'
            })
        }
        
    }catch(error){
        console.log(error);
        return NextResponse.json({
            status : 500,
            error : 'there was some error getting the info' , error
        })
    }
}