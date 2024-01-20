import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa6";
const jwt = require('jsonwebtoken');

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
 
  useEffect(() => {
    const token = getUserToken();

 
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
  

  const handleChange = (e) => {
    if (e.target.name === 'question') {
        setQuestion(e.target.value);
    } else if (e.target.name === 'answer') {
        setAnswer(e.target.value);
    } 
  }


    

  const handleSubmit = async (e) => {


    const token = localStorage.getItem("token");

    // Decode the token to get user details
    const decodedToken = jwt.decode(token);

    // Extract email from decoded token
    const userEmail = decodedToken.email;
    e.preventDefault();
    const data = {userEmail, question, answer }
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addTicket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    setQuestion('');
    setAnswer('');
    
    toast.success('Ticket Added', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push('/myaccount');
  }
    return(
        <main>
        <Head>
    <title>Ticket</title>
  </Head>
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
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            {user && (

                
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div className="text-xl text-center">
    Welcome {user.name} !!
    </div>
    <form onSubmit={handleSubmit} class="space-y-6" action="#" method="POST">
    <div>
        <label for="question" class="block text-sm font-medium leading-6 text-gray-900">Question</label>
        <div class="mt-2">
          <input value={question} onChange={handleChange} id="question" name="question" type="text" autocomplete="question" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        
      </div>
      

     



      
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ask
        </button>
      </div>
    </form>

    

   
  </div> )}
</div>
       </main>
    )

}



export default Signup;