"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../../../../../components/productForm";

export default function page(){
const pathname = usePathname().split('/')[3].toString();
const [product,changeProduct] = useState(null);
console.log(product);



useEffect(()=>{

async function getProduct(){
const response = await fetch('http://localhost:3000/api/products/getbyid',{
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({_id : pathname})
})

if(response.ok){
    const responseBody = await response.json();
    console.log('got the response',responseBody);
    changeProduct(()=>{return responseBody.product});
}else{
    const responseError = await response.json();
    console.log('error',responseError);
}
}
getProduct();
},[])

if(!product){
    return <div>wait</div> //loader
}
    return (
        <ProductForm {...product } check={true} _id={pathname}/>
    )
}