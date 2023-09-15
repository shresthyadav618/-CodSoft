"use client"
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import "./styles/featured.css";
export default function featured({product}){
    console.log('the product inside the featured component is : ',product);
    const {cartProducts,setCartProducts,addToCart} = useContext(CartContext);
    console.log('GOT THIS FROM THE CARTCONTEXT',cartProducts)
    async function addFeaturedToCart(){
        addToCart(product._id);
    }
    return(
        <div className="flex p-3 items-center justify-between text-white w-full bg-[#222]">
            <div className="feature__left flex flex-col w-[40%] mt-[60px] ml-[20px] gap-y-4">
                <h1 className="font-bold text-4xl">{product.name}</h1>
                <span className="text-sm">{product.desc} </span>
                <div className="flex gap-x-4">
                <Link href={'/product/' + product._id} className="notmain__btn">Read More</Link>
                <button className="main__btn flex gap-x-2 items-center justify-center" onClick={addFeaturedToCart}>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                Add to Cart</button>
            </div>
            </div>
            <picture className="feature__right w-[30%] mt-[60px] mr-[40px] flex justify-end">
                <img src={product.images[0]} width={'300px'} height={'300px'} className="object-contain rounded-xl  "></img>
            </picture>
            
        </div>
    )
}