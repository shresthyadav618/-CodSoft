"use client"
import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});

export function CartContextProvider({children}){
    console.log(typeof(window));
    const windowType = typeof(window);
    const [cartProducts,setCartProducts] = useState( windowType!=='undefined' ? JSON.parse(sessionStorage.getItem('cart')) || [] : [] );
    
    console.log('INSIDE THE CONTEXT',cartProducts);
    useEffect(()=>{
        sessionStorage.setItem('cart',JSON.stringify(cartProducts));
        
    },[cartProducts])
    function addToCart(productId){
        // if(cartProducts?.includes(productId)){
        //     return;
        // }
        setCartProducts((prev)=>{
            return [...prev , productId];
        })
    }
    return(
        <CartContext.Provider value={{cartProducts,setCartProducts,addToCart}}>
            {children}
        </CartContext.Provider>
    )
}