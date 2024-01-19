import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import Link from "next/link";

import { useForm } from "react-hook-form";

const UpdateProfile = () =>{
    const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (router.query && router.query.productId) {
      // Use setValue to set the default values for your form inputs
      setValue("name", /* default value for name */);
      setValue("email", /* default value for email */);
      setValue("img", /* default value for img */);
      setValue("address", /* default value for address */);
      setValue("phone", /* default value for phone */);
      setValue("pincode", 585330);
    }
  }, [router.query]);

  const onSubmit = async (data) => {
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem("token");

      // Decode the token to get user details
      const decodedToken = jwt.decode(token);

      // Extract email from decoded token
      const userEmail = decodedToken.email;

      

      // Filter out empty values
      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
      );

      // Make a POST request to update the user profile
      const response = await fetch("/api/updateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail, ...updatedData }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.success);
        router.push('/myaccount');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

    return (<main>
      <Head>
        <title>Update Profile</title>
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
            <h1>!! Welcome  !!</h1>
       </div>
       <div className="flex flex-col  mx-52 h-screen">
       <div className="flex-grow flex flex-col mx-52  justify-center">
                <h2 className=" text-center mx-0 text-xl text-blue-600">Update Your Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
              <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <input name="name" type="text" {...register("name")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              
            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input name="email" type="email" {...register("email")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Profile Image</label>
            <input name="img" type="text" {...register("img")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <input name="address" type="text" {...register("address")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
            <input name="phone" type="number" {...register("phone")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Pincode</label>
            <input name="pincode" type="number" {...register("pincode")}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

          

                <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update </button>
            </form>
</div>
     
  

    </div>
    
        </div>
        </main>
    );
  };
  

export default UpdateProfile;