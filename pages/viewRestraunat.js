// pages/dishes/breakfast.js

import React from "react";
import Head from "next/head";
import Link from "next/link";
const breakfast = ({ restaurant }) => {
  

  // Ensure products is an array, convert if necessary
  const restaurantList = Array.isArray(restaurant) ? restaurant : [];

  if (restaurantList.length === 0) {
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
          {restaurantList.map((product) => (
            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link href={`/reservation/${product.name}`} className="block relative h-50 rounded-lg overflow-hidden">
                <img alt={product.name} className="object-fill rounded object-top w-full h-[1000] block" src={product.img} />
              </Link>
              <div className="mt-4">
                
              <h2 className="text-gray-900 title-font text-lg font-medium" >{product.name}</h2>
                <p className="mt-1">₹{product.price}</p>
                <h2 className="text-gray-900 title-font text-sm font-medium">Currenlty Booked :- {product.bookedSeats}</h2>
                <h2 className="text-gray-900 title-font text-sm font-medium">available for Booking :- {product.availableSeats} </h2>
                <button>Book Now</button>
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getRestaurant`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let data = await res.json();

    // Ensure restaurant is an array
    const restaurant = Array.isArray(data.restaurant) ? data.restaurant : [];
    

    // Pass data to the page via props
    return { props: { restaurant } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { restaurant: [] } };
  }
}

export default breakfast;
