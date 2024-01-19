import { useRouter } from 'next/router';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import Head from 'next/head';


const Item = ({ product,buyNow, addToCart }) => {
  const router = useRouter();
  const { item } = router.query;


  if (!product) {
    return <p>Loading...</p>;
  }

  


  return (
 
    <main>
  <Head>
    <title>Items</title>
  </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.img || 'https://dummyimage.com/400x400'}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <p className="leading-relaxed">{product.desc}</p>
             
              <div className="flex my-10 m-10">
             {product.availableQnty>0  &&    <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>}

                {product.availableQnty<=0  &&    <span className="title-font font-medium text-xl text-gray-900">
                  Out Of Stock !!
                </span>}
                <button
                  onClick={() => {
                    addToCart(
                      product.item,
                      1,
                      product.price,
                      product.title,
                      product.category
                    );
                  }}  disabled={product.availableQnty<=0}
                  className="flex ml-auto text-white bg-indigo-500 mx-4 border-0 py-2 px-6 focus:outline-none disabled:bg-red-400 hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>

                
                  <button  onClick={() => {
                    buyNow(
                      product.item,
                      1,
                      product.price,
                      product.title,
                      product.category
                    );
                  }}  disabled={product.availableQnty<=0} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none disabled:bg-red-400 hover:bg-indigo-600 rounded ">
                     Buy Now
                  </button>
               
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const products = Array.isArray(data.products) ? data.products : [];

    const product = products.find(
      (product) => product.item === params.item || product.slug === params.item
    );

    return { props: { product } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { product: null, error: true } };
  }
}

export default Item;
