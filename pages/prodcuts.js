import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken');


const Products = () => {
  const router = useRouter();


  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Retrieve token from local storage on the client side
      const token = localStorage.getItem('token');
  
      if (token) {
        // Decode JWT token
        const decodedToken = jwt.decode(token);
  
        if (decodedToken) {
          // Check if the user is an admin based on the decoded token
          const isAdmin = decodedToken.isAdmin;
  
          // Redirect to login page if the token is not present or the user is not an admin
          if (!isAdmin || !token) {
            router.push('/login');
          }
        }
      } else {
        // Redirect to login page if the token is not present
        router.push('/login');
      }
    }
  }, []);
  

  const [title, setTitle] = useState('');
  const [item, setItem] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [availableQnty, setAvailableQnty] = useState('');
  const handleChange = (e) => {
  const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'item') {
      setItem(value);
    } else if (name === 'desc') {
      setDesc(value);
    } else if (name === 'img') {
      setImg(value);
    } else if (name === 'category') {
      setCategory(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'availableQnty') {
      setAvailableQnty(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      item,
      desc,
      img,
      category,
      price,
      availableQnty,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProdcut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
       
       
      } else {
       
       
      }
    } catch (error) {
    
    }

    // Reset form fields
    setTitle('');
    setItem('');
    setDesc('');
    setImg('');
    setCategory('');
    setPrice('');
    setAvailableQnty('');
   
    
    
    toast.success('Prodcut added successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

     
      });
      setTimeout(()=>{
       
      },)
      
   
       
      
  };
      
 
    return(
      <main>
  <Head>
    <title>Prodcut's</title>
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
                    <h2 className=" text-center mx-0 text-xl text-blue-600">Add Prodcuts</h2>
                <form onSubmit={handleSubmit} class="" action="#" method="POST">
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div class="mt-2 w-full" >
                    <input value={title} onChange={handleChange} id="title" name="title" type="text" autocomplete="title" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="item" class="block text-sm font-medium leading-6 text-gray-900">Item</label>
                    <div class="mt-2 w-full" >
                    <input  value={item} onChange={handleChange} id="item" name="item" type="text" autocomplete="item" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="desc" class="block text-sm font-medium leading-6 text-gray-900">Desc</label>
                    <div class="mt-2 w-full" >
                    <input value={desc} onChange={handleChange} id="desc" name="desc" type="text" autocomplete="desc" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="img" class="block text-sm font-medium leading-6 text-gray-900">Img</label>
                    <div class="mt-2 w-full" >
                    <input value={img} onChange={handleChange} id="img" name="img" type="text" autocomplete="img" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div class="mt-2 w-full" >
                    <input value={category} onChange={handleChange} id="category" name="category" type="text" autocomplete="category" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                    <div class="mt-2 w-full" >
                    <input value={price} onChange={handleChange} id="price" name="price" type="number" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <label for="availableQnty" class="block text-sm font-medium leading-6 text-gray-900">AvailableQnty</label>
                    <div class="mt-2 w-full" >
                    <input value={availableQnty}  onChange={handleChange} id="availableQnty" name="availableQnty" type="number" autocomplete="availableQnty" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <button type="submit" class="flex mx-80 w-1/12 my-5 justify-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add  </button>
                </form>
</div>
         
      

        </div>
        
            </div>
            </main>

    )

}



export default Products;