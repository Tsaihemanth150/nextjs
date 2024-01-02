import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');


const updateorders = () => {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
  
        if (!token) {
          router.push("/login");
        } else {
          const decodedToken = jwt.decode(token);
  
          if (!decodedToken || !decodedToken.isAdmin) {
            router.push("/login");
          }
        }
      }
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
          const response = await fetch("/api/geteveryorder", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setOrders(data.orders);
          } else {
            console.error("Failed to fetch orders");
            // Handle error and show a message to the user
            toast.error("Failed to fetch orders. Please try again.");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          // Handle error and show a message to the user
          toast.error("An unexpected error occurred. Please try again.");
        }
      };
  
      fetchOrders();
    }, []);
    
    const handleUpdateClick = (userId) => {
        // Redirect to the update page with the respective product ID without including it in the URL
        router.push(
          {
            pathname: '/updateorderdetails',
            query: { userId },
          },
          undefined,
          { shallow: true }
        );
      };

  return (
    <main>
      <Head>
        <title>My Orders</title>
      </Head>
      <div className="text-bold text-center text-2xl">My orders</div>
      <div className="container mx-20">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
  <thead className="border-b font-medium dark:border-neutral-500">
    <tr>
    <th scope="col" className="px-6 py-4">User Email</th>
      <th scope="col" className="px-6 py-4">Item Name</th>
      <th scope="col" className="px-6 py-4">Amount</th>
      <th scope="col" className="px-6 py-4">Ordered on</th>
      <th scope="col" className="px-6 py-4">Status</th>
      <th scope="col" className="px-6 py-4">Action</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <React.Fragment key={index}>
        {/* Display order details in the first row */}
        <tr className="border-b dark:border-neutral-500">
          {/* <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td> */}
        </tr>

        {/* Display product details in subsequent rows */}
        {order.products.map((product, productIndex) => (
          <tr key={productIndex} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4">{order.UserId}</td>
            <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
          
            <td className="whitespace-nowrap px-6 py-4">₹{order.amount}</td>
           
            <td className="whitespace-nowrap px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
            { order.status !== 'Cancelled'&& order.status !== 'Delivered' &&  <td className="whitespace-nowrap font-bold text-yellow-400 px-6 py-4">{order.status}</td> }
           { order.status !== 'Cancelled'&& order.status !== 'Paid'&&<td className="whitespace-nowrap font-bold  text-green-600 px-6 py-4">{order.status}</td> }
           {order.status === 'Cancelled' && <td className="whitespace-nowrap font-bold text-red-600 px-6 py-4">{order.status}</td>} 
            <td className="py-2 px-4 ">
                  <button
                    className="bg-yellow-500 px-3 my-1 rounded-md text-white"
                    onClick={() => handleUpdateClick(order._id)}
                  >
                    Update Order
                  </button>
                </td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>



              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default updateorders;
