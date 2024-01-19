import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name === 'image') {
      setImage(e.target.files[0]);
    } else if (e.target.name === 'pincode') {
      setPincode(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password, phone: parseInt(phone, 10), pincode: parseInt(pincode, 10) }
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setPincode('');
    setImage(null);
    toast.success('Signup successful! Now you can login.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push('/login');
  }
    return(
        <main>
        <Head>
    <title>signup</title>
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
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-29 rounded-full w-auto" src="login.jpeg" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Get into Family of Joy !!</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} class="space-y-6" action="#" method="POST">
    <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input value={name} onChange={handleChange} id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div class="mt-2">
          <input  value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div class="mt-2">
          <input value={password}  onChange={handleChange} id="password" name="password" type="password" autocomplete="password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Profile Pic</label>
          
        </div>
        <div class="mt-2">
          <input value={image}  onChange={handleChange} id="image" name="image" type="file" autocomplete="image"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
          
        </div>
        <div class="mt-2">
          <input value={phone}  onChange={handleChange} id="phone" name="phone" type="number" autocomplete="phone" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="pincode" class="block text-sm font-medium leading-6 text-gray-900">Pincode</label>
          
        </div>
        <div class="mt-2">
          <input value={pincode}  onChange={handleChange} id="pincode" name="pincode" type="number" autocomplete="pincode"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
     Alredy a member?
      <Link href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login here</Link>
    </p>
  </div>
</div>
       </main>
    )

}



export default Signup;