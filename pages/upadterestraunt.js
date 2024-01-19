import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import { useForm } from "react-hook-form";

const UpadteRestraunt = () =>{
  const router = useRouter();
  const { productId } = router.query;
  const { register, handleSubmit, setValue } = useForm();


  useEffect(() => {
    if (router.query && router.query.productId) {
      const productIdFromState = router.query.productId;
     

      // Use setValue to set the default values for your form inputs
      setValue("name", /* default value for title */);
      setValue("maxSeats", /* default value for item */);
      setValue("bookedSeats");
      setValue("availableSeats");
      setValue("price");
      setValue("address");
      setValue("img");

      // Repeat this for other form fields
    }
  }, [router.query]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const updatedProduct = {
        name: data.name,
        maxSeats: data.maxSeats,
        bookedSeats:data.bookedSeats,
        availableSeats: data.availableSeats,
        price: data.price,
        address:data.address,
        img: data.img,
        // Repeat this for other form fields
      };

      // Make a POST request to update the product
      const response = await fetch("/api/updateRestraunt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          updatedProduct: updatedProduct,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.success);
        
        router.push('/updateRestraunt')
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

    return (<main>
      <Head>
        <title>Update restraunat</title>
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
                <h2 className=" text-center mx-0 text-xl text-blue-600">Update Restaurant</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
              <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <input name="name" type="text" {...register("name")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              
            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Max Seats</label>
            <input name="maxSeats" type="number" {...register("maxSeats")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Booked Seats</label>
            <input name="bookedSeats" type="number" {...register("bookedSeats")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Available Seats</label>
            <input name="availableSeats" type="number" {...register("availableSeats")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <input name="price" type="number" {...register("price")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <input name="address" type="text" {...register("address")}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Image </label>
            <input name="img" type="text" {...register("img")}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update </button>
            </form>
</div>
     
  

    </div>
    
        </div>
        </main>
    );
  };
  

export default UpadteRestraunt;