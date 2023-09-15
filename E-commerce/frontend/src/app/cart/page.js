'use client'
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../../components/cartContext"
import Header from "../../../components/header"
// import "../../styles/cart.css";
import "../../styles/cart.css"
export default function page(){
    const windowType = typeof(window);
    if(windowType!=='undefined'){
        const cartSession = sessionStorage.getItem('cart');
        console.log('THE SESSION STORAGE CART',cartSession);
    }
    const {cartProducts , setCartProducts} = useContext(CartContext);
    console.log('THE VALUE OF CART PRODUCTS ARE : ',cartProducts);
    const [products,setProducts] = useState([]);
    const [information,setInformation] = useState({
        name : "",
        email : "",
        city : "",
        postalCode : "",
        streetAddress : "",
        country : ""
    })
    const uniqueCartProducts = new Set(cartProducts);
    const uniqueProducts = [...uniqueCartProducts];
    useEffect(()=>{
         async function getData(){
            
            console.log('THE UNIQUE CART PRODUCTS ARE ',uniqueCartProducts);
            if(cartProducts.length > 0){
                const response = await fetch('/api/getById',{
                    method : 'POST',
                    headers : {'Content-Type':'application/json'},
                    body : JSON.stringify({ids : uniqueProducts})
                });
                const responseJSON = await response.json();
                if(response.ok){
                    console.log('GOT THE RESPONSE',responseJSON);
                    setProducts(responseJSON.products);
                }else{
                    console.log('SOME ERROR , INSIDE CART PAGE',responseJSON);
                }
             }
         }
         getData();
    },[cartProducts]);
 
    let totalPrice = 0;
    uniqueCartProducts.forEach((elm)=>{
        const productId = elm;
        const reqProduct = products.filter((child)=>{return child._id === productId});
        console.log('the required product is : ',reqProduct[0]);
        if(reqProduct){
            const reqProductPrice = parseInt(reqProduct[0]?.price);
            const reqProductOccurences = parseInt( cartProducts.filter((pro)=>{return pro === productId}).length );
            console.log('THE REQpRODUCT PRICE AND OCCURENCES ARE : ',reqProductPrice , reqProductOccurences)
            totalPrice = totalPrice + reqProductPrice*reqProductOccurences;
        }
    })  
    console.log('THE TOTAL COST COMES OUT TO BE : ',totalPrice);

    async function changeProductOccurences(operation , p){
        if(operation == "-"){
            setCartProducts((prev)=>{
                let ct = 1;
                return prev.filter((pr)=>{if(pr == p._id){
                    if(ct){
                        ct--;
                    }else{
                        return pr;
                    }
    
                }else{
                    return pr;
                }})
            })
        }else{
            setCartProducts((prev)=>{
                return [... prev , p._id];  
            })
        }
    }
    console.log('THE VALUE OF INFORMATION IS : ',information);
    function handleInfoChange(pname , e){
        const value = e.target.value;
        setInformation((prev)=>{
            return {...prev , [pname] : value};
        })
    }


    useEffect(()=>{
        if(windowType!=='undefined' && window?.location?.href.includes('success')){
            setCartProducts([]);
        }
    },[])

    async function handleFormSubmit(e){
        e.preventDefault();
        const response = await fetch('/api/checkout',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({...information , cartProducts , products})
        });
        if(response.ok){
            console.log('THE RESPONSE IS : ',response);
            const responseJson = await response.json();
            console.log('THE RESPONSE JSON IS : ',responseJson.url);
            
            if(windowType!=='undefined')
            window.location.href = responseJson.url;
        }else{
            console.log('there was some error while getting back the url');
        }
    }

    // const windowType = typeof(window);
    if( windowType!=='undefined' && window?.location?.href.includes('success')){
        return <div className="flex flex-col w-full h-[100vh]">
            <Header/>
            <div className="flex flex-col bg-[#f0f0f0] p-8 h-[100%]">
            <div className="cart__first__container w-[60%] bg-white text-black p-4 rounded-lg">
                <h1 className="font-bold text-xl">Thanks for Your order!</h1>
                <span>We will email you when your order will be sent.</span>
            </div>
            </div>
        </div>
    }
totalPrice = Number(totalPrice);
return(
    <div className="flex flex-col w-full h-[100vh]">
        <Header/>
        <div className="flex w-full gap-x-8 items-center justify-center bg-[#f0f0f0] p-6 cart__container h-[100%]">
           <div className="cart__first__container w-[60%] bg-white text-black p-4 rounded-lg">
            {cartProducts.length ?
                 <div> 
                  <h2 className="font-bold">Cart</h2>
                  <table>
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {products && products.length>0 && products?.map((p)=>{
                    return <tr>
                        <td className="pt-4 pb-4">  <div className="image__box"> <img src={p.images[0]} width={'80px'} height={'80px'} className="object-contain" ></img> </div> {p.name} </td>
                        <td className=""> <button className="cart__btn" onClick={()=>{
                            changeProductOccurences("-",p);
                        }}>-</button> <span className="ml-2 mr-2">{cartProducts.filter((pro)=>{return pro === p._id}).length}</span>  <button className="new__cart__btn" onClick={()=>{
                            changeProductOccurences("+",p);
                        }}>+</button> </td>
                        <td> {  p.price * cartProducts.filter((pro)=>{return pro === p._id}).length } </td>
                    </tr>
                  })}
                  
                        <tr>
                            <td></td>
                            <td></td>
                            {isNaN(totalPrice)? <td></td> : <td>₹{totalPrice}</td> }
                        </tr>
                    </tbody>
                  </table>
                 </div>
                    :
                 <div>Your Cart is empty</div>}
           </div>
           {cartProducts && cartProducts.length>0 && 
           <div className="cart__second__container w-[30%] bg-white text-black flex flex-col p-4 rounded-lg gap-y-4">
            <h1 className="font-bold">Order Information</h1>
            <form className="flex flex-col gap-y-4" onSubmit={(e)=>{handleFormSubmit(e)}}>
            <input placeholder="Name" onChange={(e)=>{handleInfoChange("name" , e)}}  value={information.name} ></input>
            <input placeholder="Email" onChange={(e)=>{handleInfoChange("email" , e)}}  value={information.email} type="email"></input>
            
            <div className="flex two__input__container w-full gap-x-1">
              <input placeholder="City" onChange={(e)=>{handleInfoChange("city" , e)}} value={information.city} ></input>
              <input placeholder="Postal Code" onChange={(e)=>{handleInfoChange("postalCode" , e)}} value={information.postalCode} type="number"></input>
            </div>

            <input placeholder="Street Address" onChange={(e)=>{handleInfoChange("streetAddress" , e)}} value={information.streetAddress} ></input>
            <input placeholder="Country" onChange={(e)=>{handleInfoChange("country" , e)}} value={information.country} ></input>
            <button className="new__cart__btn" type="submit">Continue to payment</button>
            </form>
           </div>
           }
        </div>
    </div>
)
}