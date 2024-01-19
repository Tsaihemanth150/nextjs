import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import Link from "next/link";

const UpadteRestraunt = ({ restaurant }) => {
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
  }, [router]);

  const handleUpdateClick = (productId) => {
    // Redirect to the update page with the respective product ID without including it in the URL
    router.push(
      {
        pathname: '/upadterestraunt',
        query: { productId },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <main>
  <Head>
    <title>Update Prodcuts</title>
  </Head>
    <div className="container mx-auto p-4">
      <div className="text-center text-3xl mb-4">
        <h1>!! Welcome Admin !!</h1>
      </div>

      <div>
        <h2 className="text-2xl text-center font-bold mb-2">View and update </h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2  border-b">Serial No</th>
              <th className="py-2  border-b">Name Of the Restaurant</th>
              <th className="py-2  border-b">Max Seats</th>
              <th className="py-2  border-b">booked Seats</th>
              <th className="py-2  border-b">Price</th>
              <th className="py-2  border-b">Address</th>
              <th className="py-2  border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurant.map((restaurant, index) => (
              <tr key={restaurant.id}>
                <td className="py-2  px-10 border-b">{index + 1}</td>
                <td className="py-2 px-6 border-b">{restaurant.name}</td>
                <td className="py-2 px-6 border-b">{restaurant.maxSeats}</td>
                <td className="py-2 px-4 border-b">{restaurant.bookedSeats}</td>
                <td className="py-2 px-4 border-b">{restaurant.price}</td>
                <td className="py-2 px-4 border-b">{restaurant.address}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 px-3 my-1 rounded-md text-white"
                    onClick={() => handleUpdateClick(restaurant._id)}
                  >
                    Update Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getRestaurant`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const restaurant = Array.isArray(data.restaurant) ? data.restaurant : [];

    return { props: { restaurant } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { restaurant: null, error: true } };
  }
}

export default UpadteRestraunt;
