import { categoriesModel } from "@/models/categories";
import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import { isAdminCheck } from "../auth/[...nextauth]/route";
await isAdminCheck();
const handler = async(NextRequest)=>{
    console.log('the method is : ',NextRequest.method);
    connect();
    if(NextRequest.method==='POST'){
        try{
            console.log('inside the api route handler');
    const reqBody = await NextRequest.json();
    console.log(reqBody);
    const {name,parentCategory,properties} = reqBody;
    console.log('the parent category is : ',parentCategory);
    const newCategory = await new categoriesModel({
        name : name,
        parent : parentCategory===''? null : parentCategory ,
        properties : properties
    });
    await newCategory.save();
    
    console.log('the new category is saved : ',newCategory);
    return NextResponse.json({
        status: 200,
        newCategory
    });
        }catch(error){
    return NextResponse.json({
        status : 500,
        error : 'there was some error sending back the response',error
    })
        }
    }

    if(NextRequest.method === 'GET'){
        console.log('inside the get request');
        const categories = await categoriesModel.find({}).populate('parent');
        if(categories){
            console.log('the categories are found',categories);
            return NextResponse.json({
                status : 200,
                categories
            })
        }else{
            console.log('no category found');
            return NextResponse.json({
                status : 500,
                error : 'no category found'
            })
        }
    }

    if(NextRequest.method ==='PUT'){
        console.log('inside the put request');
        const reqBody = await NextRequest.json();
        const {_id , name , parentCategory , properties} = reqBody;
        console.log('the id is : ',_id , 'and name & parent',name,parentCategory,properties);

        const category = await categoriesModel.findById(_id);
        if(category){
            console.log('found the category by id',category);
            const updatedCategory = await category.updateOne({
                name : name,
                parent : parentCategory ===''? null : parentCategory,
                properties : properties === null ? [] : properties
            });
            // await updatedCategory.save();
            return NextResponse.json({
                status : 200,
                updatedCategory
            })
        }else{
            console.log('unable to find the category');
            return NextResponse.json({
                status : 500,
                error : 'there was some error while finding the category'
            })
        }

    }

    
}


export { handler as GET, handler as POST, handler as PUT };

