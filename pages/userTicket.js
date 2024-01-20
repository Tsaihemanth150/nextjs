import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');
import Link from "next/link";

const ViewTicket = ({ products }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(false);
    }, []);
  
    const getEmailFromToken = () => {
      if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem("token"); // Replace "yourTokenKey" with the actual key used to store the token
        if (token) {
          const decodedToken = jwt.decode(token);
          return decodedToken ? decodedToken.email : null;
        }
      }
      return null;
    };
  
    const userEmail = getEmailFromToken();
  
    const filteredProducts = products.filter(product => product.userId === userEmail);
  
    return (
      <main>
        <Head>
          <title>Update Products</title>
        </Head>
        <div className="container mx-auto p-4">
          <div className="text-center text-3xl mb-4">
          
          </div>
  
          {filteredProducts.length > 0 ? (
            <div>
              <h2 className="text-2xl text-center font-bold mb-2">Your  Tickets </h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                  <th className="py-2  border-b">Serial No</th>
             
              <th className="py-2  border-b">Question</th>
              <th className="py-2  border-b">Answer</th>
              <th className="py-2  border-b">Status</th>
              <th className="py-2  border-b">Created </th>
              <th className="py-2  border-b">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td className="py-2  px-10 border-b">{index + 1}</td>
                     
                      <td className="py-2 px-6 border-b">{product.question}</td>
                      <td className="py-2 px-6 border-b">{product.Answer}</td>
                      <td className="py-2 px-4 border-b">{product.status}</td>
                      <td className="py-2 px-6 border-b">{product.createdAt}</td>
                      <td className="py-2 px-4 border-b">{product.updatedAt}</td>
  
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-xl mt-4">
              <p>You have no Tickets</p>

            </div>
          )}
        </div>
      </main>
    );
  };

export async function getServerSideProps(context) {
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
