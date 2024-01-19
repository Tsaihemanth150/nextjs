// components/MyAccount.js
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getUserToken();

    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    // Fetch user details from the API using the provided token
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Find the user with the matching email in the response
        const userEmail = decodeToken(token).email;
        const currentUser = data.users.find((user) => user.email === userEmail);

        if (currentUser) {
          // Set the retrieved user in the state
          setUser(currentUser);
        } else {
          console.error("User not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [router]);

  const getUserToken = () => {
    return localStorage.getItem("token"); // Replace with your actual storage mechanism
  };

  // Function to decode the token (replace this with your actual decoding logic)
  const decodeToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  return (
    <>
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

      <Head>
        <title>My Account</title>
      </Head>

      <div>
        {user ? (
          <>
            <div className="font-bold text-center text-2xl">
              My Account
            </div>

            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                  <div className="flex flex-col sm:flex-row mt-10">
                    <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                      
                      <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      
                      <div className="flex flex-col items-center text-center justify-center">
                        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Hi {user.name} !!</h2>
                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                        {user.AboutMe !== null   && <Link href={'/updateprofile'}><button className="bg-cyan-500 px-2 rounded-md text-white">Update Profile</button></Link>}
                        {user.AboutMe === null && <Link href={'/updateaccount'}><button className="bg-cyan-500 rounded-md text-white">Add Details</button></Link>}
                        <Link href={'/'}> <button className="bg-cyan-500 px-3  my-5 rounded-md text-white">Update Password</button></Link>
                        <div className="my-4 text-sm">
                <QRCode value={`Name: ${user.name}, Email: ${user.email}`} className='min-w-0'/>
              </div> 
                      </div>
                    </div>
                    <div className="sm:w-2/3 md:pl-8 font-bold sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                      Wallate Amount: ₹ {user.wallate}<br/>
                      Email: {user.email} <br/>
                      Phone : {user.phone} <br/>
                      Address: {user.address} <br/>
                      pincode : {user.pincode} <br/>
                      <br/>
                      
                      <Link href={'/addAmount'}><button className="bg-cyan-500 px-2 rounded-md text-white">Add Amount</button></Link> <br/>

                    
                 { user.isAdmin===true    && <Link href={'/prodcuts'}>Prodcuts:- <button className="bg-green-500 mx-1 px-3 my-5 rounded-md text-white">Add Prodcuts</button></Link>  }
                 { user.isAdmin===true    && <Link href={'/updateproduct'}> <button className="bg-yellow-500 px-3 my-5 rounded-md text-white">Upadte Prodcuts</button></Link> }
                    { user.isAdmin===true  && <Link href={'/deleteproduct'}> <button className="bg-red-500 px-3 my-5 rounded-md text-white">Delete Prodcuts</button></Link> } 
                  <br/>
                        
              { user.isStaf===true  && <Link href={'/prodcuts'}>Prodcuts:- <button className="bg-green-500 mx-1 px-3 my-5 rounded-md text-white">Add Prodcuts</button></Link>  }
                 { user.isStaf===true    && <Link href={'/updateproduct'}> <button className="bg-yellow-500 px-3 my-5 rounded-md text-white">Upadte Prodcuts</button></Link> }
                 { user.isStaf===true  && <Link href={'/deleteproduct'}> <button className="bg-red-500 px-3 my-5 rounded-md text-white">Delete Prodcuts</button></Link> } 
                  <br/>
                  { user.isAdmin===true    && <Link href={'/restraunat'}>Restraunt:- <button className="bg-green-500 mx-1 px-3 my-5 rounded-md text-white">Add Restaurant</button></Link>  }
                  { user.isAdmin===true    && <Link href={'/updateRestraunt'}><button className="bg-yellow-500 mx-1 px-3 my-5 rounded-md text-white">Upadte Restaurant</button></Link>  }
                  { user.isAdmin===true    && <Link href={'/deleteRestraunt'}><button className="bg-red-500 mx-1 px-3 my-5 rounded-md text-white">Delete Restaurant</button></Link>  }
                    <br/>
                    {user.isAdmin===true && <Link href={'/deleteusers'}> Users:-<button className="bg-red-500 px-3 mx-2 my-5 rounded-md text-white">Ban User</button></Link>} <br/>
                    {user.isAdmin===true && <Link href={'/updateorders'}> Orders:-<button className="bg-yellow-500 px-3 mx-2 my-5 rounded-md text-white">Update Order Details</button></Link>}
                    </div>
                   </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p className="text-center text-2xl text-red-700">Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default MyAccount;
