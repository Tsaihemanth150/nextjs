// Import necessary modules
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');

const deleteusers = ({ users }) => {
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

  const handleDeleteClick = async (productId) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteusers`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the server sends a success message
      const data = await response.json();
      toast.success(data.success);
  
      // Reload the page after successful deletion
      router.reload();
  
    } catch (error) {
      console.error('Error deleting product:', error.message);
      toast.error('Error deleting product');
    }
  };

  return (
    <main>
  <Head>
    <title>Ban Users</title>
  </Head>
    <div className="container mx-auto p-4">
      <div className="text-center text-3xl mb-4">
        <h1>!! Welcome Admin !!</h1>
      </div>
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
      <div>
        <h2 className="text-2xl text-center font-bold mb-2">Ban Users</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              
              <th className="py-2  border-b">Name</th>
              <th className="py-2  border-b">Email</th>
              <th className="py-2  border-b">Phone</th>
              <th className="py-2  border-b">Address</th>
              <th className="py-2  border-b">Pinocde</th>
              <th className="py-2  border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            { users.map((users, index) => (
             !users.isAdmin &&(  
              <tr key={users.id}>
               
                <td className="py-2 px-6 border-b">{users.name}</td>
                <td className="py-2 px-6 border-b">{users.email}</td>
                <td className="py-2 px-4 border-b">{users.phone}</td>
                <td className="py-2 px-4 border-b">{users.address}</td>
                <td className="py-2 px-4 border-b">{users.pincode}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 px-3 my-1 rounded-md text-white"
                    onClick={() => handleDeleteClick(users._id)}
                  >
                    Ban user
                  </button>
                </td>
              </tr>)
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUsers`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const users = Array.isArray(data.users) ? data.users : [];

    return { props: { users } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { users: null, error: true } };
  }
}

export default deleteusers;
