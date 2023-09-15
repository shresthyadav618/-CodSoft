"use client"
import Link from "next/link";
import { useContext } from "react";
import { styled } from "styled-components";
import { CartContext } from "./cartContext";
const StyledHeader = styled.header`
display: flex;
justify-content: space-between;
padding: 10px;
background-color: #222;
color: white;
`;
export default function header(){

    const {cartProducts} = useContext(CartContext);
    const cartSize = cartProducts?.length || 0;
    
  return(
      <header>
        <StyledHeader>
        <Link href={'/'} className="ml-[20px]">Ecommerce</Link>
        <nav className="flex gap-x-3 text-white text-lg mr-[40px]">
            <Link href={'/home'}>Home</Link>
            <Link href={'/products'}>Products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartSize})</Link>
        </nav>
        </StyledHeader>
    </header>
  )

}