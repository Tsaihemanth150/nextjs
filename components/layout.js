import Navbar from './Navbar'
import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
     
      <main>{children}</main>
     
        <Footer />
         
    </>
  )
}