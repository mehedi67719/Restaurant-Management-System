import React, { useState } from "react";
import { FaStar, FaUtensils, FaShoppingCart, FaTruck, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchFood, fetchRestaurants } from "../Components/api";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Home = () => {
  const [dark, setDark] = useState(false);

  const { data: foods, isLoading: foodLoading, isError: foodError, error: foodErrMsg } = useQuery({
    queryKey: ["Foods"],
    queryFn: fetchFood,
  });

  const { data: restaurants, isLoading: resLoading, isError: resError, error: resErrMsg } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const heroImages = [
    "https://images.pexels.com/photos/10749578/pexels-photo-10749578.jpeg",
    "https://images.pexels.com/photos/3252136/pexels-photo-3252136.jpeg",
    "https://images.pexels.com/photos/31150174/pexels-photo-31150174.jpeg",
  ];

  const steps = [
    { icon: <FaUtensils size={30} />, title: "Browse Restaurants", desc: "Find restaurants and foods you love" },
    { icon: <FaShoppingCart size={30} />, title: "Choose Your Food", desc: "Select from a wide range of meals" },
    { icon: <FaTruck size={30} />, title: "Place an Order", desc: "Confirm your order easily" },
    { icon: <FaSmile size={30} />, title: "Enjoy Delivery", desc: "Get food delivered fast to your door" },
  ];

  const stats = [
    { label: "Orders Delivered", value: "10K+" },
    { label: "Happy Customers", value: "5K+" },
    { label: "Partner Restaurants", value: "300+" },
    { label: "Active Users", value: "8K+" },
  ];

  const testimonials = [
    { name: "John Doe", review: "Amazing service! The food arrived hot and fresh.", rating: 5, photo: "https://source.unsplash.com/100x100/?man" },
    { name: "Jane Smith", review: "Great variety of restaurants. Loved the experience.", rating: 4.8, photo: "https://source.unsplash.com/100x100/?woman" },
    { name: "Ali Khan", review: "Fast delivery and excellent support team.", rating: 5, photo: "https://source.unsplash.com/100x100/?man" },
  ];

  const faqs = [
    { q: "How do I pay?", a: "You can pay via card, mobile banking, or cash on delivery." },
    { q: "What is delivery time?", a: "Delivery usually takes 30–45 minutes." },
    { q: "Can I track my order?", a: "Yes, a tracking link is sent after placing order." },
  ];

  if (foodLoading || resLoading) return <div className="flex justify-center mt-20"><Spinner /></div>;
  if (foodError) return <p className="text-center text-red-500 mt-10">{foodErrMsg.message}</p>;
  if (resError) return <p className="text-center text-red-500 mt-10">{resErrMsg.message}</p>;

  const topFoods = foods.slice(0, 4);
  const topRestaurants = restaurants.slice(0, 4);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500`}>


      <section className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="h-96 md:h-[600px] w-full bg-cover bg-center flex flex-col justify-center items-center text-center px-4" style={{ backgroundImage: `url(${img})` }}>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Delicious food, delivered fast!
                </h1>
                <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
                  Order your favorite meals from top restaurants in your city
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary px-6 py-3 rounded-lg"><Link to='/foods'>Order Now</Link></button>
                  <button className="btn-primary px-6 py-3 rounded-lg"><Link to='/restaurants'>Browse Restaurants</Link></button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>


      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Top Restaurants</h2>
        <div className="flex justify-center mb-6">{resLoading && <Spinner />}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {topRestaurants.map((r) => (
            <div key={r._id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img src={r.image} alt={r.name} className="h-52 w-full object-cover" />
                {r.isOpen ? (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-xl font-semibold">Open</span>
                ) : (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-xl font-semibold">Closed</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{r.name}</h3>
                  <p className="text-black bg-orange-400 py-0.5 px-2 rounded-xl font-semibold text-sm">⭐ {r.rating}</p>
                </div>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3"><FaMapMarkerAlt /> {r.location}</p>
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block text-sm font-semibold text-primary">{r.category}</span>
                  <span className="inline-block text-sm font-semibold text-gray-500 dark:text-gray-400">{r.reviews ? r.reviews.length : 0} Reviews</span>
                </div>
                <button className="btn-primary w-full py-3 rounded-2xl text-lg">
                  <Link to={`/restaurants/${r._id}`}>View Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Top Foods</h2>
        <div className="flex justify-center mb-6">{foodLoading && <Spinner />}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {topFoods.map((f) => (
            <div key={f._id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <img src={f.image} alt={f.name} className="h-52 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{f.name}</h3>
                <p className="text-primary font-semibold mb-2">${f.price}</p>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: Math.round(f.rating) }).map((_, i) => <FaStar key={i} />)}
                </div>
                <div className="flex items-center gap-1">
                  <button className="btn-primary w-full  text-lg">
                    <Link>Add to Cart</Link>
                  </button>
                  <button className="btn-primary w-full   text-lg">
                    <Link to={`/food/${f._id}`}>View Detels</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    
      <section className="py-16 px-4 max-w-[95%] mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {steps.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4 text-primary">{s.icon}</div>
              <h3 className="font-semibold dark:text-white">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-black p-6 rounded-lg shadow">
              <p className="text-3xl font-bold dark:text-white">{s.value}</p>
              <p className="text-gray-600 dark:text-gray-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-black p-6 rounded-lg shadow text-center">
              <img src={t.photo} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">“{t.review}”</p>
              <div className="flex justify-center text-yellow-400 mb-2">
                {Array.from({ length: Math.round(t.rating) }).map((_, i) => <FaStar key={i} />)}
              </div>
              <h4 className="font-semibold dark:text-white">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white dark:bg-black p-4 rounded-lg shadow">
              <summary className="font-semibold cursor-pointer dark:text-white">{f.q}</summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
