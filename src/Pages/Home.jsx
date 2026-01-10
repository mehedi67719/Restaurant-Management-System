import React, { useState } from "react";
import { FaStar, FaUtensils, FaShoppingCart, FaTruck, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
import Useauth from "../Hooks/Useauth";
import Swal from "sweetalert2";
import { fetchapproveFood, fetchapproveRestaurants,   } from "../Components/api";

const Home = () => {
  const { User } = Useauth()
  const [dark, setDark] = useState(false);
  const queryClient = useQueryClient();
  const { data: foods, isLoading: foodLoading, isError: foodError, error: foodErrMsg } = useQuery({
    queryKey: ["Foods"],
    queryFn: fetchapproveFood,
  });

  const { data: restaurants, isLoading: resLoading, isError: resError, error: resErrMsg } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchapproveRestaurants,
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
    { name: "John Doe", review: "Amazing service! The food arrived hot and fresh.", rating: 5, photo: "data:image/jpeg;base64,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" },
    { name: "Jane Smith", review: "Great variety of restaurants. Loved the experience.", rating: 4.8, photo: "data:image/jpeg;base64,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" },
    { name: "Ali Khan", review: "Fast delivery and excellent support team.", rating: 5, photo: "data:image/jpeg;base64,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" },
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



  const handeladdtocart = async (food) => {
    if (!User?.email) return Swal.fire({ icon: "error", title: "Login Required", text: "Please login first." });

    const cartItem = {
      foodId: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      quantity: 1,
      userEmail: User.email,
      date: new Date(),
    };

    try {
      const res = await fetch("https://restaurant-management-system-server-lime.vercel.app/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      const data = await res.json();
      if (res.ok) {
        queryClient.invalidateQueries(["cart", User.email]);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: `${food.name} has been added to your cart.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  }

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
                  <Link to='/foods' className="btn-primary px-6 py-3 rounded-lg">Order Now</Link>
                  <Link to='/restaurants' className="btn-primary px-6 py-3 rounded-lg">Browse Restaurants</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>


      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Top Restaurants</h2>
        <div className="flex justify-center mb-6">{resLoading && <Spinner />}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

                <Link to={`/restaurants/${r._id}`} className="btn-primary w-full py-3 rounded-2xl text-lg">View Details</Link>

              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Top Foods</h2>
        <div className="flex justify-center mb-6">{foodLoading && <Spinner />}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 Lg:gap-10 sm:gap-10 md:gap-4">
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

                  <button onClick={() => handeladdtocart(f)} className="btn-primary w-full  text-lg">Add to Cart</button>
                  <Link to={`/food/${f._id}`} className="btn-primary w-full  text-lg">View Detels</Link>

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
              <img src={t.photo} className="w-25 h-25 rounded-full mx-auto mb-4 object-cover" />
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
