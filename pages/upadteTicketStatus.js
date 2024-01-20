import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import { useForm } from "react-hook-form";

const UpadteTicketStatus = () =>{
  const router = useRouter();
  const { productId } = router.query;
  const { register, handleSubmit, setValue } = useForm();


  useEffect(() => {
    if (router.query && router.query.productId) {
      const productIdFromState = router.query.productId;
     console.log(productIdFromState)

      // Use setValue to set the default values for your form inputs
      setValue("Answer", /* default value for title */);
      setValue("status", );
      
      // Repeat this for other form fields
    }
  }, [router.query]);

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
  }, []);



  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
     
      const updatedTicket = {
        Answer: data.Answer,
        status: data.status,
        
        // Repeat this for other form fields
      };

      // Make a POST request to update the product
      const response = await fetch("/api/updateTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          updatedTicket: updatedTicket,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.success);
        
        router.push('/viewTicket')
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

    return (<main>
      <Head>
        <title>Update Items</title>
      </Head>
      <div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <div className="justify-center text-center text-3xl">
            <h1>!! Welcome Admin !!</h1>
       </div>
       <div className="flex flex-col  mx-52 h-screen">
       <div className="flex-grow flex flex-col mx-52  justify-center">
                <h2 className=" text-center mx-0 text-xl text-blue-600">Update Prodcuts</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
              <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Answer</label>
            <input name="Answer" type="text" {...register("Answer")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              
            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
            <input name="status" type="text" {...register("status")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

           
                <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update </button>
            </form>
</div>
     
  

    </div>
    
        </div>
        </main>
    );
  };
  

export default UpadteTicketStatus;