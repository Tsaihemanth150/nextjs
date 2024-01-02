import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import { useForm } from "react-hook-form";

const updateitems = () =>{
  const router = useRouter();
  const { productId } = router.query;
  const { register, handleSubmit, setValue } = useForm();


  useEffect(() => {
    if (router.query && router.query.productId) {
      const productIdFromState = router.query.productId;
     

      // Use setValue to set the default values for your form inputs
      setValue("title", /* default value for title */);
      setValue("item", /* default value for item */);
      setValue("desc");
      setValue("img");
      setValue("category");
      setValue("price");
      setValue("availableQnty");

      // Repeat this for other form fields
    }
  }, [router.query]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const updatedProduct = {
        title: data.title,
        item: data.item,
        desc:data.desc,
        img: data.img,
        category: data.category,
        price:data.price,
        availableQnty: data.availableQnty,
        // Repeat this for other form fields
      };

      // Make a POST request to update the product
      const response = await fetch("/api/updateProdcut", {
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
        
        router.push('/updateproduct')
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
              <label for="item" class="block text-sm font-medium leading-6 text-gray-900">title</label>
            <input name="title" type="text" {...register("title")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              
            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">item</label>
            <input name="item" type="text" {...register("item")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">desc</label>
            <input name="desc" type="text" {...register("desc")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">img</label>
            <input name="img" type="text" {...register("img")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">category</label>
            <input name="category" type="text" {...register("category")} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">price</label>
            <input name="price" type="number" {...register("price")}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

            <label for="item" class="block text-sm font-medium leading-6 text-gray-900">availableQnty</label>
            <input name="availableQnty" type="number" {...register("availableQnty")}  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update </button>
            </form>
</div>
     
  

    </div>
    
        </div>
        </main>
    );
  };
  

export default updateitems;