"use client"
import { useContext } from "react";
import { CartContext } from "./cartContext";
import "./styles/newProducts.css";
export default function NewProducts({products}){
    console.log('INSIDE THE NEWPRODCUTS THE PRODUCTS ARE',products);
    const {addToCart} = useContext(CartContext);
    return(
        <div className="flex flex-col second__container items-center justify-center">
            <h1>New Arrivals</h1>
            <div className=" product__container flex flex-wrap items-center justify-center">
                {products && products.length>0 && products.map((p)=>{
                  return <div className="flex flex-col p-6">
                    <div className="product__image__container"><img className="product__image" src={p.images[0]}></img></div>
                    <div className="flex p-2 flex-col">
                    <div className="font-bold">{p.name}</div>
                    <div className="flex gap-x-2 items-center justify-between mt-1"> 
                      <div className="font-extrabold text-xl">₹{p.price}</div>
                      <button className="cart__btn" onClick={()=>{addToCart(p._id)}}>Add to cart</button>
                    </div>
                    </div>
                  </div>  
                })}
            </div>
        </div>
    )
}