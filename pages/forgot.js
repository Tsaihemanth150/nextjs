import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, [router]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // TODO: Add logic to send a password reset request to the server
    // For example, using a fetch or axios call to your server API endpoint.

    // Replace the following placeholder with your actual server endpoint.
    const serverEndpoint = "/api/forgotpassword";

    try {
      const response = await fetch(serverEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Password reset request successful
        // You may redirect the user to a confirmation page or show a success message
        console.log("Password reset request sent successfully");
      } else {
        // Handle the error, show an error message, etc.
        console.error("Password reset request failed");
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
    }
  };
    return(
        
            <main>
            <Head>
        <title>Forgot Password</title>
      </Head>
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-29 rounded-full w-auto" src="login.jpeg" alt="Your Company"/>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
      </div>
    
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
    
         
    
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
          </div>
        </form>
              <div className=" text-center my-4 text-lg text-bold">
                or
                </div>
        <p class="mt-5 text-center text-sm text-gray-500">
          
          <Link href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login here</Link>
        </p>
      </div>
    </div>
           </main>
    )
}


export default Forgot;