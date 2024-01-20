import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import Link from "next/link";

const ViewTicket = ({ products }) => {
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
  }, []);

  const handleUpdateClick = (productId) => {
    // Redirect to the update page with the respective product ID without including it in the URL
    router.push(
      {
        pathname: '/upadteTicketStatus',
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
        <h2 className="text-2xl text-center font-bold mb-2">View and update Ticket</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2  border-b">Serial No</th>
              <th className="py-2  border-b">Email</th>
              <th className="py-2  border-b">Question</th>
              <th className="py-2  border-b">Answer</th>
              <th className="py-2  border-b">Status</th>
              <th className="py-2  border-b">Created </th>
              <th className="py-2  border-b">Update</th>
              <th className="py-2  border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-2  px-10 border-b">{index + 1}</td>
                <td className="py-2 px-6 border-b">{product.userId}</td>
                <td className="py-2 px-6 border-b">{product.question}</td>
                <td className="py-2 px-6 border-b">{product.Answer}</td>
                <td className="py-2 px-4 border-b">{product.status}</td>
                <td className="py-2 px-6 border-b">{product.createdAt}</td>
                <td className="py-2 px-4 border-b">{product.updatedAt}</td>
               
              
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 px-3 my-1 rounded-md text-white"
                    onClick={() => handleUpdateClick(product._id)}
                  >
                    Answer or update
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getTickets`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const products = Array.isArray(data.ticket) ? data.ticket : [];

    return { props: { products } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { products: null, error: true } };
  }
}

export default ViewTicket;
