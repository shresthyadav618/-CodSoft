import { connect } from "@/dbConfig/dbConfig";
import { orderModel } from "@/models/order";
import { NextResponse } from "next/server";
export async function GET(NextRequest){
  await connect();
  const order = await orderModel.find().sort({createdAt: "desc"})
  return NextResponse.json({
    status : 200,
    order : order
  })
}