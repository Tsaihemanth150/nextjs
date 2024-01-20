import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


const MyOrders = () => {
        const [orders, setOrders] = useState([]);
        const router = useRouter();
      
        useEffect(() => {
          const fetchOrders = async () => {
            try {
              const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
              const response = await fetch("/api/getOrders", {
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
        const handleUpdateClick = async (orderId, userId, amount) => {
          const confirmCancel = window.confirm("Do you want to cancel the order? The amount will be refunded to wallate and Charges will apply");
        
          if (confirmCancel) {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch("/api/cancelOrder", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId, userId, amount }),
              });
        
              if (response.ok) {
                const data = await response.json();
                toast.success("Order cancelled successfully!");
                router.push('/myorders');
              } else {
                console.error("Failed to cancel order");
                toast.error("Failed to cancel order. Please try again.");
              }
            } catch (error) {
              console.error("Error cancelling order:", error);
              toast.error("An unexpected error occurred. Please try again.");
            }
          }
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
      <th scope="col" className="px-6 py-4">Product Name</th>
      <th scope="col" className="px-6 py-4">Category</th>
      <th scope="col" className="px-6 py-4 text-center">Quantity</th>
      <th scope="col" className="px-6 py-4">Amount</th>
      <th scope="col" className="px-6 py-4">Ordered on</th>
      <th scope="col" className="px-6 py-4">Status</th>
      <th scope="col" className="px-6 py-4">Cancle</th>
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
            <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
        
            <td className="whitespace-nowrap px-6 py-4">{product.category}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{product.quantity}</td>
            <td className="whitespace-nowrap px-6 py-4">₹{order.amount}</td>
            {/* Display only the date from the createdAt timestamp */}
            <td className="whitespace-nowrap px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
            { order.status !== 'Cancelled'&& order.status !== 'Delivered' &&  <td className="whitespace-nowrap font-bold text-yellow-400 px-6 py-4">{order.status}</td> }
           { order.status !== 'Cancelled'&& order.status !== 'Paid'&&<td className="whitespace-nowrap font-bold  text-green-600 px-6 py-4">{order.status}</td> }
           {order.status === 'Cancelled' && <td className="whitespace-nowrap font-bold text-red-600 px-6 py-4">{order.status}</td>} 
            {order.status !== 'Delivered'&& order.status !== 'Cancelled' && (
    <button
      className="bg-red-500 px-3 my-5 rounded-md text-white"
      onClick={() => handleUpdateClick(order._id,order.UserId,order.amount)}
    >
      Cancel
    </button>
  )}
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

export default MyOrders;
