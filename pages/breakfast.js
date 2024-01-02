// pages/dishes/breakfast.js

import React from "react";
import Head from "next/head";

const breakfast = ({ products }) => {
  

  // Ensure products is an array, convert if necessary
  const productList = Array.isArray(products) ? products : [];

  if (productList.length === 0) {
    return (
      <div className="justify-center text-center text-red-800 text-2xl">
        <p>We are under maintains we will back soon.</p>
      </div>
    );
  }

  return (
    <main>
  <Head>
    <title>Breakfast</title>
  </Head>
    <section className="text-gray-600 mx-24  my-1 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {productList.map((product) => (
            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a href={`/dishes/${product.item}`} className="block relative h-50 rounded-lg overflow-hidden">
                <img alt={product.title} className="object-fill rounded object-top w-full h-[1000] block" src={product.img} />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  <img width="20" height="20" src="https://img.icons8.com/color-glass/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol"/>
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                <p className="mt-1">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch data from external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let data = await res.json();

    // Ensure products is an array
    const products = Array.isArray(data.products) ? data.products : [];
    const breakfastProducts = products.filter((product) => product.category === 'breakfast');

    // Pass data to the page via props
    return { props: { products: breakfastProducts } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { products: [] } };
  }
}

export default breakfast;
