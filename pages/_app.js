import Layout from '../components/layout'
import '../app/globals.css'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
 
export default function MyApp({ Component, pageProps }) {
        const [cart,setCart] = useState({})
        const [subTotal,setSubTotal]=useState(0)
        const router = useRouter()
        const [user,setUser]= useState({value:null})
        const [key,setKey]=useState()
        const [progress, setProgress] = useState(0)

        useEffect(()=>{
          
        router.events.on('routeChangeComplete', ()=>{
          setProgress(100)
        })

        router.events.on('routeChangeStart', ()=>{
          setProgress(40)
        })
          try {

            if(localStorage.getItem("cart")){
              setCart(JSON.parse(localStorage.getItem("cart")))
              saveCart(JSON.parse(localStorage.getItem("cart")))
            }

          } catch (error) {
            console.log(error)
            localStorage.clear
          }

          const token=localStorage.getItem('token')
                  if(token){
                    setUser({value:token})
                    setKey(Math.random())
                  }
         
        },[router.query])
        
        
        const saveCart = (myCart) =>{
          localStorage.setItem("cart",JSON.stringify(myCart))

          let subT=0;
          let keys=Object.keys(myCart)
          for(let i=0;i<keys.length;i++){
            subT+=myCart[keys[i]].price*myCart[keys[i]].qnty;
          }
          setSubTotal(subT)
        }

        const addToCart = (itemCode,qnty,price,name,category) =>{
            let newCart=cart;

            if(itemCode in cart){
              newCart[itemCode].qnty = cart[itemCode].qnty + qnty
            }else{
              newCart[itemCode] = {qnty:1,price,name,category}
            }

            setCart(newCart)
            saveCart(newCart)  //this is persiantce method to save cart items after relaod 


        }


        const buyNow = (itemCode,qnty,price,name,category) =>{
          let newCart={itemCode:{qnty:1,price,name,category}};
          setCart(newCart)
          saveCart(newCart)
          router.push('/checkout')
        
        }


        const clearCart = () =>{
          setCart({})
          saveCart({})
        }

        const removeFromCart = (itemCode,qnty,price,name,category) =>{
          let newCart=cart;

            if(itemCode in cart){
              newCart[itemCode].qnty = cart[itemCode].qnty - qnty
            }

            if(newCart[itemCode]["qnty"]<=0){
              delete newCart[itemCode]
            }

            setCart(newCart)
            saveCart(newCart)  //this is persiantce method to save cart items after relaod 


        }

          const logout = () =>{
            localStorage.removeItem("token")
            setUser({value:null})
            setKey(Math.random())
            router.push('/')
          }





  return <>
  <LoadingBar
        color='#f70034'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    
     <Navbar logout={logout} user={user} key={key} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} 
      subTotal={subTotal}></Navbar>

    <Layout>
      <Component cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} 
      subTotal={subTotal} {...pageProps} />
    </Layout>
  </>
}