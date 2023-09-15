"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Common from "../../../../../components/common";
export default function page(){
    // const Router = useRouter();
    const pathname = usePathname().split('/')[3].toString();
    console.log('inside delete',pathname)
    async function handleDelete(){
        const response = await fetch('http://localhost:3000/api/products/delete',{
            method : 'POST',
            body : JSON.stringify({_id : pathname}),
            headers : {'Content-Type':'application/json'}
        });
        if(response.ok){
            const responseBody = await response.json();
            console.log('product was deleted',responseBody);
            // Router.push('/products');
            window.location.href='/products';
        }else{
            const responseError = await response.json();
            console.log('some error',responseError);
        }
    }
    return(
        <Common><div className="flex flex-col gap-y-4">
            <div>Do you really want to Delete this product</div>
            <div className="flex gap-x-2"><button onClick={handleDelete}>Yes</button> <Link className="btn" href={`/products`}>No</Link></div>
            </div></Common>
    )
}