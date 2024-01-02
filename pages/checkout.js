// checkout.js
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useRouter } from "next/router";

const jwt = require('jsonwebtoken');

const Checkout = ({ cart, addToCart, removeFromCart, clearCart }) => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);



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

  const sendOrderData = async (orderData) => {
    try {
     
      const response = await fetch('/api/sendorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        console.log("Order data sent successfully");
        // Show a success message to the user
        toast.success("Order placed successfully!");
      } else {
        console.error("Failed to send order data");
        // Show an error message to the user
        toast.error("Failed to send order data. Please try again.");
      }
    } catch (error) {
      console.error("Error sending order data:", error);
      // Show an error message to the user
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const sendWallateAmount = async (newAmountInwallate) => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
  
      // Decode the JWT token to get user information
      const decodedToken = jwt.decode(token);
  
      // Check if the token is valid
      if (!decodedToken) {
        console.error("Invalid token");
        return;
      }
  
      // Extract the user email from the decoded token
      const userEmail = decodedToken.email;
  
      // Log the user email for debugging purposes
      console.log("User Email:", userEmail );
      console.log("Upadted wallet amountn:", newAmountInwallate);
      // Send a POST request to the updateWallate API endpoint
      const response = await fetch('/api/updateWallate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, newAmountInwallate }), // Format the body as an object
      });
  
      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        console.log("Wallate is updated successfully");
        // You can add further logic here if needed
      } else {
        console.error("Failed to send Wallate data");
        // Handle the case where the request was not successful
        // You might want to show an error message to the user or perform other actions
      }
    } catch (error) {
      // Log and re-throw any unexpected errors
      console.error("Error sending Wallate data:", error.message);
      throw error;
    }
  };
  
  


  const getUserEmailFromToken = () => {
    // Replace with your logic to extract user email from the JWT token in local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        return decodedToken ? decodedToken.email : null;
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
      }
    }
  
    return null;
  };

  


  const getUserId = async () => {
    const userEmail = getUserEmailFromToken();
  
    // Use the user's email as the UserId
    return userEmail;

  };



  const getWallateAmmount = async ()=>{
    const userWallate=user.wallate;
    return userWallate;
  }
  
  const handlePayment = async () => {
    const orderId = uuidv4();
  
    console.log("Processing payment...");
  
    try {
      const userId = await getUserId();
      const walletAmount = await getWallateAmmount(); // Corrected typo
      const orderAmount = isPromoCodeValid ? totalAmount : subTotal + 20;
  
      if (walletAmount >= orderAmount) {
   
        const newAmountInwallate = walletAmount - orderAmount; // Corrected subtraction
        
        console.log("Payment successful!");
        const orderData = {
          orderId,
          UserId: userId,
          products: Object.keys(cart).map((k) => ({
            productId: k,
            quantity: cart[k].qnty,
            name: cart[k].name,
            category: cart[k].category,
          })),
          amount: orderAmount,
          status: "Paid",
        };
        sendWallateAmount(newAmountInwallate);
        sendOrderData(orderData);
        // Reduce the available quantity of items in the cart after checkout
        Object.keys(cart).forEach((productId) => {
          const availableQuantity = cart[productId].availableQuantity || 0;
          const purchasedQuantity = cart[productId].qnty || 0;
          const remainingQuantity = Math.max(
            availableQuantity - purchasedQuantity,
            0
          );
  
          removeFromCart(
            productId,
            remainingQuantity,
            cart[productId].price,
            cart[productId].name,
            cart[productId].category
          );
        });
  
        clearCart();
      } else {
        console.log("Insufficient funds in the wallet. Payment cannot be processed.");
        // Optionally show a message to the user about insufficient funds
        toast.error("Insufficient funds in the wallet. Payment cannot be processed.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error and show a message to the user
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  
  
  const subTotal = Object.keys(cart).reduce(
    (total, key) => total + cart[key].qnty * cart[key].price,
    0
  );

  const applyPromoCode = () => {
    const promoCodeMappings = {
      mycook20: 0.2,
      mycook50: 0.5,
      mycookfree: 0.1,
      newyear2024: 0.7,
    };

    const promoCodeDiscount = promoCodeMappings[promoCode];

    if (promoCodeDiscount !== undefined) {
      const discountedAmount = subTotal * (1 - promoCodeDiscount);
      setIsPromoCodeValid(true);
      setTotalAmount(discountedAmount + 20);
    } else {
      setIsPromoCodeValid(false);
      setTotalAmount(subTotal + 20);
    }
  };

  return (
  <main>
  <Head>
    <title>Checkout</title>
  </Head>
    <div className="container m-12">
      <h1 className="font-bold text-center text-2xl my-5">Checkout</h1>

      <h2 className="font-bold text-l">2. Review Your Cart Items</h2>

      <div className="sidebar w-3/6 text-center bg-slate-300 p-10">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div>Your cart is empty!! Add items to Checkout</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className="w-2/3 font-semibold">{cart[k].name}</div>
                <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                  <AiFillMinusCircle
                    onClick={() => {
                      if (!isPromoCodeValid) {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].category
                        );
                      }
                    }}
                    className="cursor-pointer text-blue-400"
                  />
                  <span className="mx-2">{cart[k].qnty}</span>
                  <AiFillPlusCircle
                    onClick={() => {
                      if (!isPromoCodeValid) {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].category
                        );
                      }
                    }}
                    className="cursor-pointer text-blue-400"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        {Object.keys(cart).length !== 0 && (
          <div className="flex-col mx-0">
            <div className="font-bold text-left text-md">
              Promo Code:
              <input
                className="rounded-lg mx-2"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="mt-2 mx-11 text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-400 rounded text-l"
                onClick={applyPromoCode}
              >
                Apply
              </button>
            </div>

            {isPromoCodeValid && (
              <div className="text-green-600 my-4 mx-4">
                Promo Code Applied Successfully !!
              </div>
            )}
          </div>
        )}

        {Object.keys(cart).length !== 0 && (
          <div className="flex-col my-3">
            <div className="total font-bold text-left text-md">
              Items In cart: ₹ {subTotal}
            </div>

            <div className="total font-bold text-left text-md">
              Delivery + GST: ₹20
            </div>

            {isPromoCodeValid && (
              <div className="total font-bold text-left text-lg">
                Total Amount: ₹{totalAmount}
              </div>
            )}

            {!isPromoCodeValid && (
              <div className="total font-bold text-left text-lg">
                Total Amount: ₹{subTotal + 20}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          {Object.keys(cart).length !== 0 && (
            <Link href={"/"}>
              <button
                disabled={Object.keys(cart).length === 0}
                onClick={handlePayment}
                className="disabled:bg-red-400 flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l"
              >
                Pay ₹ {isPromoCodeValid ? totalAmount : subTotal + 20}
              </button>
            </Link>
          )}

          {Object.keys(cart).length === 0 && (
            <Link href={"/fooditems"}>
              <button className="mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l">
                Add To Cart
              </button>
            </Link>
          )}

          {Object.keys(cart).length !== 0 && (
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="flex mx-auto disabled:bg-red-400 mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-l"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
    
    
    </main>
  );
};

export default Checkout;
