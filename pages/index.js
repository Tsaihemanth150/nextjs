import Image from 'next/image'
import '../styles/globals.css'
import img from '../public/home.jpg'
import React, { useState } from 'react';
import Head from 'next/head'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CiViewList } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { LuBadgePercent } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import QRCode from 'react-qr-code';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
     const [isBannerOpen, setBannerOpen] = useState(true);

    const closeBanner = () => {
      setBannerOpen(false);
    };
    
    
return (
  <main>
  <Head>
    <title>MyCook</title>
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
  <div>
      {isBannerOpen && (
        <div className="relative isolate mx-28 my-2 rounded-lg flex items-center gap-x-6 overflow-hidden bg-gray-50 px-10 py-2 sm:px-3.5 sm:before:flex-1">
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
              }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
            The sale is on form the 1st jan  to 2nd july use   <strong className="font-semibold">newyear2024 </strong>  and 
              The sale is on form the 1st jan  to 2nd july use   <strong className="font-semibold">MyCook20 </strong> to get 20 % off
            </p>
            <Link
              href="/fooditems"
              className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Order Now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className={`relative isolate ${isBannerOpen ? 'flex' : 'hidden'} items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}>
            <div className="flex flex-1 justify-end">
              <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={closeBanner}>
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  
 <div>{/* <Image src={img} width={1000} height={100} className='mx-52 my-5 px-16  rounded-md'></Image> */}
  <h1 className='text-center text-3xl font-semibold container rounded-sm my-5'>Welcome to MyCook - Your Culinary Destination!</h1>
    <p className='mx-8'>
Welcome to MyCook - Your Culinary Destination!

Indulge your senses in a world of exquisite flavors at MyCook, where passion meets innovation in every dish. We are not just an online restaurant; we are your culinary companion on a gastronomic journey like no other. Whether youre a food enthusiast or someone seeking a delightful dining experience, MyCook is your go-to destination for mouthwatering delights.</p>
      
 </div>
 <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
      <Image alt="feature" width={800} height={250} className="object-cover object-center h-full w-full" src="/home.jpg"/> 
    </div>
    <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
      <div className="flex flex-col mb-10 lg:items-start items-center">
      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
        <CiViewList className='text-6xl text-indigo-400 my-4'/>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Explore Our Menu</h2>
          <p className="leading-relaxed text-base">Embark on a culinary adventure with our diverse and carefully crafted menu. From sizzling starters to delectable main courses, and tantalizing desserts, MyCook offers a symphony of flavors that will satisfy every palate. Our chefs meticulously curate each dish, ensuring a perfect blend of quality ingredients and culinary expertise..</p>
          <a  className="mt-3 text-indigo-500 inline-flex items-center">View
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:items-start items-center">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
        <BiDish className='text-6xl'/>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Order with Ease</h2>
          <p className="leading-relaxed text-base">At MyCook, we prioritize your convenience. Our user-friendly online platform allows you to browse the menu effortlessly, customize your orders, and experience hassle-free online payments. With just a few clicks, you can have a gourmet feast delivered right to your doorstep.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:items-start items-center">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
        <LuBadgePercent className='text-6xl' />
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Exclusive Offers and Discounts</h2>
          <p className="leading-relaxed text-base">At MyCook, we believe in making exceptional dining experiences accessible to all. Enjoy exclusive offers, discounts, and loyalty rewards that add an extra layer of delight to your MyCook journey.</p>
          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
 
  </main>
 

  )
}


