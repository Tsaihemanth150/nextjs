import { useRouter } from 'next/router';
import Head from 'next/head';

const Booking = ({ restaurant, buyNow, addToCart }) => {
  const router = useRouter();
  const { booking } = router.query;

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  const product = restaurant;

  return (
    <main>
      <Head>
        <title>Booking Details</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="restaurant"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.img || 'https://dummyimage.com/400x400'}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <h1 className="leading-relaxed">Available Seats: {product.availableSeats}</h1>
              <h2 className="text-lg">Address: {product.address}</h2>
              <div className="flex my-10 m-10">
                {product.availableSeats > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
                {product.availableSeats <= 0 && (
                  <span className="title-font font-medium text-xl text-gray-900">
                    Booking Full !!
                  </span>
                )}
                <button
                  onClick={() => {
                    addToCart(
                      product.item,
                      1,
                      product.price,
                      product.name,
                      product.address
                    );
                  }}
                  disabled={product.availableSeats <= 0}
                  className="flex ml-auto text-white bg-indigo-500 mx-4 border-0 py-2 px-6 focus:outline-none disabled:bg-red-400 hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    buyNow(
                      product.item,
                      1,
                      product.price,
                      product.name,
                      product.address
                    );
                  }}
                  disabled={product.availableSeats <= 0}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none disabled:bg-red-400 hover:bg-indigo-600 rounded "
                >
                  Book Now
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getRestaurant`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const products = Array.isArray(data.restaurant) ? data.restaurant : [];

  

    const restaurant = products.find(
      (product) => product.booking === params.booking || product.slug === params.booking || product.name === params.booking
    );



    if (!restaurant) {
      return { props: { restaurant: null } };
    }

    return { props: { restaurant } };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { props: { restaurant: null, error: true } };
  }
}


export default Booking;
