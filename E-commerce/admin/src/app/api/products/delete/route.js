
import { productModel } from "@/models/productModel";
import { NextResponse } from "next/server";
import { isAdminCheck } from "../../auth/[...nextauth]/route";
await isAdminCheck();
export async function POST(NextRequest){
    const reqBody = await NextRequest.json();
    console.log('inside delete route handler', reqBody);
    const {_id} =  reqBody;

    try{
        const res = await productModel.findByIdAndDelete(_id);
        return NextResponse.json({
            status : 200,
            res
        })
    }catch(err){
        return NextResponse.json({
            status : 500,
            error : 'there was some error',err
        })
    }
}