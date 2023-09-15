
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Common from "../../../components/common";
export default function page(){
console.log('inside products')
const [products, changeProducts] = useState(null);
console.log(products);
useEffect(()=>{
async function getProducts(){
console.log('inside the get products function')
const response = await fetch('http://localhost:3000/api/products',{
    method : 'GET'
});



if(response.ok){
const details = await response.json();
console.log(details);
changeProducts(()=>{return details.productsExists});
}else{
    const responseError = await response.json();
    console.log('error fetching the details of the product',responseError);
}

}
getProducts();
},[])
    return(
<Common> 

<Link href={'/products/new'} className="bg-blue-900 text-white p-4 rounded-xl mb-6">Add New Product</Link>
<table className="mt-6 basic w-full">
    
    <thead className="w-full"><tr><td>Product Name</td> <td></td></tr> </thead>
       
    {products && products.map((elm)=>{
        
        return <tr><td>{elm.name}</td> <td className="flex gap-x-4"><Link href={`/products/edit/${elm._id}`}  className="p-4 btn flex items-center  gap-x-4">Edit  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg> </Link>  <Link className="p-4 btn flex items-center  gap-x-4" href={`/products/delete/${elm._id}`}>Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
 </Link>
       </td></tr>
    })}
    
    
    </table>
</Common>
    )
}