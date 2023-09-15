"use client"
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../components/cartContext";
import Header from "../../../../components/header";
export default function page(){
    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const [product,setProduct] = useState(null);
    

    console.log('THE ID IS : ',id);
    useEffect(()=>{
        async function getProduct(){
            const response = await fetch("/api/getById",{
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({ids : [id]})
            });
            if(response.ok){
                const data = await response.json();
                console.log('the response is : ',data);
                setProduct(data.products[0]);
            }
        }
        getProduct();
    },[]);
    const {addToCart} = useContext(CartContext);
    console.log('THE PRODUCT INFORMATION IS : ',product);
    console.log('THE IMAGE ARRAY IS : ',product?.images);
    return(


        <div className="flex flex-col w-full h-[100vh]">
            <Header/>
            <div className="w-[100%] h-[100vh] bg-[#f0f0f0] flex p-6 gap-x-8 single__container">
              <div className="single__container__con flex">
                {product  && <>
                    <div className="single__left__container flex flex-col max-w-[30%] min-w-[20%]  gap-y-6 bg-white p-6 rounded-md">
                    <div><img src={product?.images?.[0]} width={'100px'} height={'100px'} className="object-contain"></img></div>
                    <div className="flex"> 
                    {product?.images && product.images.length>1 && product.images.map((imageElm , idx)=>{
                        if(idx >=1){return <img src={imageElm} width={'60px'} height={'60px'} className="object-contain"></img>}
                    })}
                     </div>
                </div>
                <div className="single__right__container flex flex-col max-w-[50%] min-w-[30%] gap-y-4 p-6">
                    <h1 className="font-extrabold text-lg">{product.name}</h1>
                    <span className="font-semibold">{product.desc}</span>
                    <div className="flex gap-x-4 items-center "> 
                    <div className="text-lg font-bold">₹{product.price}</div>
                    <button className="new__cart__btn flex gap-x-2 items-center" onClick={()=>{addToCart(product._id)}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    Add to Cart</button>
                     </div>
                </div>
                </>}
              </div>
            </div>
        </div>
    )
}