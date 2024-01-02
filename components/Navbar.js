import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "../public/logo1.jpeg";
import { FaCartShopping } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

const Navbar = ({ user, buyNow,logout, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const close = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();

  return (
    <nav
      className="bg-gray-100 block w-full max-w-screen-xl px-6 py-3 mx-auto text-black border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200"
    >
      <div className="flex items-center justify-start text-blue-gray-900">
        <a
          href="/"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased"
        >
          <div style={{ borderRadius: "10px", overflow: "hidden" }}>
            <Image src={img} width={80} height={80}></Image>
          </div>
        </a>

        <div className="lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="/fooditems" className="flex items-center transition-colors hover:text-blue-500">
                Food Items
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="/about" className="flex items-center transition-colors hover:text-blue-500">
                About us
              </a>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <a href="/contactus" className="flex items-center transition-colors hover:text-blue-500">
                Conatcat Us
              </a>
            </li>
            <div className="cart text-2xl absolute right-0 top-11 mx-5 flex">
             {user.value && <VscAccount
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="mx-6 my-2"
              /> }
              { dropdown && (
                <div
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setDropdown(false);
                  }}
                  className="absolute text-sm px-5 w-20 top-8 bg-transparent right-5" >
                  <ul>
                    <Link href={'/myaccount'}>
                      <li className="text-sm hover:text-blue-500">My Account</li>
                    </Link>
                    <Link href={'/myorders'}>
                      <li className="text-sm hover:text-blue-500">Orders</li>
                    </Link>
                    <li onClick={logout} className="text-sm hover:text-blue-500">Logout</li>
                  </ul>
                </div>
              )}
              {!user.value && (
                <Link href={"/login"}>
                  <button className="bg-cyan-300 px-3 text-black rounded-lg text-xl mx-5">Login</button>
                </Link>
              )}
              {user.value && <FaCartShopping className="my-2" onClick={close} /> }
            </div>
            <div
              ref={ref}
              className={`sidebar absolute text-center top-11 -right-32 bg-green-200 p-10 transition-transform translate-x-0 ${
                Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <h2>Mycook Cart</h2>
              <span onClick={close} className="absolute top-2 cursor-pointer right-2">
                <IoCloseSharp />
              </span>
              <ol className="list-decimal font-semibold">
                {Object.keys(cart).length === 0 && (
                  <div>
                    Your cart is empty !! <br /> add items to Checkout
                  </div>
                )}

                {Object.keys(cart).map((k) => {
                  return (
                    <li key={k}>
                      <div className="item flex my-5">
                        <div className="w-2/3 font-semibold">{cart[k].name}</div>
                        
                        <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                          <AiFillMinusCircle 
                            onClick={() => {
                              removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].category);
                            }}
                            className="cursor-pointer text-blue-400 w-20"
                          />
                          <span className="mx-2">{cart[k].qnty}</span>
                          <AiFillPlusCircle
                            onClick={() => {
                              addToCart(k, 1, cart[k].price, cart[k].name, cart[k].category);
                            }}
                            className="cursor-pointer text-blue-400  w-20"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="font-bold">Total Amount :₹ {subTotal}</div>

              <Link href={"/checkout"}>
                <button disabled={Object.keys(cart).length==0} className=" disabled:bg-red-300 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l">
                  <BsFillBagCheckFill className="m-1" />
                  Checkout
                </button>
              </Link>
              <button disabled={Object.keys(cart).length==0}
                onClick={clearCart}
                className="disabled:bg-red-300  flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l"
              >
                Clear Cart
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
