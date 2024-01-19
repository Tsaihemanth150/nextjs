import React, { useEffect,useState } from "react";
import { Router, useRouter } from "next/router";
import breakfast from '../public/breakfast.jpeg'
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";


const FoodItems = () =>{
  const router = useRouter()
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      router.push('/login')
    }

  },[])
    return(
      <main>
  <Head>
    <title>Menue</title>
  </Head>
<section class="text-gray-600 mx-20 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link href='/breakfast' className="block relative h-48 rounded-lg overflow-hidden">
                <Image alt="ecommerce" className="object-fill rounded object-top" width={300} height={100} src="/breakfast.jpeg"/>
       </Link>
        <div class="mt-4">
          
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1"> 
          <div className="flex">
          <img width="20" height="20" src="https://img.icons8.com/color-glass/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol"/>
          <img width="20" height="20" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/> 
          </div>
          </h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">Breakfast</h2>
          <p class="mt-1">Staring from ₹20</p>
        </div>
      </div>
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link href='/breakfast' className="block relative h-48 rounded-lg overflow-hidden">
                <Image alt="ecommerce" className="object-fill rounded object-top" width={300} height={100} src="/lunch.jpeg"/>
       </Link>
        <div class="mt-4">
        <div className="flex">
          <img width="20" height="20" src="https://img.icons8.com/color-glass/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol"/>
          <img width="20" height="20" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/> 
          </div>
          <h2 class="text-gray-900 title-font text-lg font-medium">Lunch</h2>
          <p class="mt-1">Starting from ₹35</p>
        </div>
      </div>
     
    </div>
  </div>
</section>
</main>
    )
}


export default FoodItems;