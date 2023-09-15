import { productModel } from "@/models/productsModel";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({
        status: 200,
        products: await productModel.find()
    })
}