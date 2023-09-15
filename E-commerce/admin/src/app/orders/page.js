"use client"
import { useEffect, useState } from "react";
import Common from "../../../components/common";

export default function page(){
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
       async function getOrders(){
        const response = await fetch('/api/orders',{
            method : 'GET'
           });
    
           if(response.ok){
            const data = await response.json();
            console.log('THE ORDER DETAILS ARE',data);
            setOrders(data.order);
           }
       }

       getOrders();
    },[])

    return(
<Common>
    <h1>Orders</h1>
    <table className="basic mt-6 w-full">
        <thead>
            <tr>
            <td>Date</td>
            <td>Paid</td>
            <td>Recipient</td>
            <td>Products</td>
            </tr>
            {orders && orders?.length > 0 && orders.map(order => (
          <tr key={order._id}>
            <td>{(new Date(order.createdAt)).toLocaleString()}
            </td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'YES' : 'NO'}
            </td>
            <td>
              {order.name} {order.email}<br />
              {order.city} {order.postalCode} {order.country}<br />
              {order.streetAddress}
            </td>
            <td>
              {order.line_items.map(l => (
                <>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br />
                </>
              ))}
            </td>
          </tr>
        ))}
        </thead>
    </table>
</Common>
    )
}