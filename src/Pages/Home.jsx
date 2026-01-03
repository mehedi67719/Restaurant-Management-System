import React, { useState } from "react";
import { FaStar, FaUtensils, FaShoppingCart, FaTruck, FaSmile } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [dark, setDark] = useState(false);

  const heroImages = [
    "https://source.unsplash.com/1600x600/?burger",
    "https://source.unsplash.com/1600x600/?pizza",
    "https://source.unsplash.com/1600x600/?biryani",
  ];

  const categories = [
    { name: "Pizza", image: "https://source.unsplash.com/100x100/?pizza" },
    { name: "Burger", image: "https://source.unsplash.com/100x100/?burger" },
    { name: "Sushi", image: "https://source.unsplash.com/100x100/?sushi" },
    { name: "Indian", image: "https://source.unsplash.com/100x100/?indian-food" },
    { name: "Dessert", image: "https://source.unsplash.com/100x100/?dessert" },
    { name: "Drinks", image: "https://source.unsplash.com/100x100/?drink" },
  ];

  const restaurants = [
    { name: "Food Heaven", rating: 4.8, category: "Pizza", location: "Dhaka", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Spicy Hub", rating: 4.5, category: "Indian", location: "Chittagong", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Tasty Bites", rating: 4.7, category: "Burger", location: "Sylhet", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Burger King", rating: 4.6, category: "Burger", location: "Khulna", image: "https://source.unsplash.com/300x200/?restaurant" },
  ];

  const foods = [
    { name: "Cheese Pizza", price: 10.99, rating: 4.8, image: "https://source.unsplash.com/200x200/?pizza" },
    { name: "Veg Burger", price: 8.99, rating: 4.6, image: "https://source.unsplash.com/200x200/?burger" },
    { name: "Chicken Biryani", price: 12.99, rating: 4.7, image: "https://source.unsplash.com/200x200/?biryani" },
    { name: "Sushi", price: 14.99, rating: 4.5, image: "https://source.unsplash.com/200x200/?sushi" },
    { name: "Chocolate Cake", price: 6.99, rating: 4.9, image: "https://source.unsplash.com/200x200/?dessert" },
    { name: "Soft Drink", price: 1.99, rating: 4.3, image: "https://source.unsplash.com/200x200/?drink" },
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
    { name: "John Doe", review: "Amazing service!", rating: 5, photo: "https://source.unsplash.com/100x100/?man" },
    { name: "Jane Smith", review: "Delicious food!", rating: 4.8, photo: "https://source.unsplash.com/100x100/?woman" },
    { name: "Ali Khan", review: "Fast delivery!", rating: 5, photo: "https://source.unsplash.com/100x100/?man" },
  ];

  const faqs = [
    { q: "How do I pay?", a: "You can pay via card, mobile banking, or cash on delivery." },
    { q: "What is delivery time?", a: "Delivery usually takes 30–45 minutes." },
    { q: "Can I track my order?", a: "Yes, a tracking link is sent after placing order." },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "dark" : ""} bg-gray-100 dark:bg-gray-900`}>
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
              <div
                className="h-96 md:h-[600px] w-full bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
                style={{ backgroundImage: `url(${img})` }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Delicious food, delivered fast!
                </h1>
                <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
                  Order your favorite meals from top restaurants in your city
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <button className="btn-primary px-6 py-3 font-semibold rounded-lg">Order Now</button>
                  <button className="btn-primary px-6 py-3 font-semibold rounded-lg">Browse Restaurants</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Popular Restaurants</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          navigation
          loop
        >
          {restaurants.map((r) => (
            <SwiperSlide key={r.name}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
                <img src={r.image} alt={r.name} className="h-44 w-full rounded mb-4 object-cover"/>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{r.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{r.category} - {r.location}</p>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: Math.round(r.rating) }).map((_, i) => <FaStar key={i} />)}
                </div>
                <button className="btn-primary w-full py-2 font-semibold rounded-lg">View Menu</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Popular Foods</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
          navigation
          loop
        >
          {foods.map((f) => (
            <SwiperSlide key={f.name}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
                <img src={f.image} alt={f.name} className="h-40 w-full rounded mb-4 object-cover"/>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{f.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">${f.price}</p>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: Math.round(f.rating) }).map((_, i) => <FaStar key={i} />)}
                </div>
                <button className="btn-primary w-full py-2 font-semibold rounded-lg">Add to Cart</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-6">
          <button className="btn-primary px-6 py-2 font-semibold rounded-lg">See All Foods</button>
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {steps.map((step, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-primary mb-4 flex justify-center">{step.icon}</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{s.value}</p>
              <p className="text-gray-600 dark:text-gray-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Testimonials</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 } }}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 5000 }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col items-center text-center">
                <img src={t.photo} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover"/>
                <p className="text-gray-600 dark:text-gray-300 mb-2">"{t.review}"</p>
                <div className="flex gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: Math.round(t.rating) }).map((_, i) => <FaStar key={i} />)}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto text-center bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Sign Up Now & Get Your First Order Free!</h2>
        <button className="btn-primary px-6 py-3 font-semibold rounded-lg">Register Now</button>
      </section>

      <section className="py-16 px-4 max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
