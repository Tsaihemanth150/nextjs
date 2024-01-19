import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');

const Restraunat = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [maxSeats, setMaxSeats] = useState('');
  const [bookedSeats, setBookedSeats] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [img, setImg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'maxSeats') {
      setMaxSeats(value);
    } else if (name === 'bookedSeats') {
      setBookedSeats(value);
    } else if (name === 'availableSeats') {
      setAvailableSeats(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'img') {
      setImg(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      maxSeats,
      bookedSeats,
      availableSeats,
      price,
      address,
      img
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addRestaurant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Handle success, if needed
        toast.success('Restaurant added successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Failed to add restaurant:", res.statusText);
        toast.error('Failed to add restaurant. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error('Failed to add restaurant. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // Reset form fields
    setName('');
    setMaxSeats('');
    setBookedSeats('');
    setAvailableSeats('');
    setPrice('');
    setAddress('');
    setImg('');
  };
   
 
    return(
      <main>
  <Head>
    <title>Prodcuts</title>
  </Head>
      
        <div>
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
            <div className="justify-center text-center text-3xl">
                <h1>!! Welcome Admin !!</h1>
           </div>
           <div className="flex flex-col  mx-52 h-screen">
           <div className="flex-grow flex flex-col mx-52  justify-center">
                    <h2 className=" text-center mx-0 text-xl text-blue-600">Add Restraunat</h2>
                <form onSubmit={handleSubmit} class="" action="#" method="POST">
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2 w-full" >
                    <input value={name} onChange={handleChange} id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Max Seats</label>
                    <div class="mt-2 w-full" >
                    <input  value={maxSeats} onChange={handleChange} id="maxSeats" name="maxSeats" type="number" autocomplete="maxSeats" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="desc" class="block text-sm font-medium leading-6 text-gray-900">Booked Seats</label>
                    <div class="mt-2 w-full" >
                    <input value={bookedSeats} onChange={handleChange} id="desc" name="bookedSeats" type="number" autocomplete="bookedSeats" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="availableSeats" class="block text-sm font-medium leading-6 text-gray-900">Available Seats</label>
                    <div class="mt-2 w-full" >
                    <input value={availableSeats} onChange={handleChange} id="availableSeats" name="availableSeats" type="number" autocomplete="availableSeats" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    
                    <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                    <div class="mt-2 w-full" >
                    <input value={price} onChange={handleChange} id="price" name="price" type="number" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="availableQnty" class="block text-sm font-medium leading-6 text-gray-900">address</label>
                    <div class="mt-2 w-full" >
                    <input value={address}  onChange={handleChange} id="address" name="address" type="text" autocomplete="address" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="availableQnty" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                    <div class="mt-2 w-full" >
                    <input value={img}  onChange={handleChange} id="img" name="img" type="text" autocomplete="img" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add  </button>
                </form>
</div>
         
      

        </div>
        
            </div>
            </main>

    )

}



export default Restraunat;