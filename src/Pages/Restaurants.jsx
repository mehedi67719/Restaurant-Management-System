import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Restaurants = () => {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");

  const restaurants = [
    { name: "Food Heaven", rating: 4.8, category: "Pizza", location: "Dhaka", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Spicy Hub", rating: 4.5, category: "Indian", location: "Chittagong", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Tasty Bites", rating: 4.7, category: "Burger", location: "Sylhet", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Burger King", rating: 4.6, category: "Burger", location: "Khulna", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Sushi World", rating: 4.9, category: "Sushi", location: "Dhaka", image: "https://source.unsplash.com/300x200/?restaurant" },
    { name: "Desi Biryani", rating: 4.7, category: "Biryani", location: "Rajshahi", image: "https://source.unsplash.com/300x200/?restaurant" },
  ];

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500`}>
 

      <div className="max-w-[95%] mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Restaurants</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <div className="flex gap-2 flex-wrap">
            <button className="btn-primary px-4 py-2">All</button>
            <button className="btn-primary px-4 py-2">Pizza</button>
            <button className="btn-primary px-4 py-2">Burger</button>
            <button className="btn-primary px-4 py-2">Sushi</button>
            <button className="btn-primary px-4 py-2">Biryani</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((r, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1">
              <img src={r.image} alt={r.name} className="h-44 w-full rounded-t-lg object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-1">{r.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{r.category} - {r.location}</p>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: Math.round(r.rating) }).map((_, idx) => <FaStar key={idx} />)}
                </div>
                <button className="btn-primary w-full py-2 font-semibold rounded-lg">View Menu</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <button className="btn-primary px-4 py-2">Prev</button>
          <button className="btn-primary px-4 py-2">1</button>
          <button className="btn-primary px-4 py-2">2</button>
          <button className="btn-primary px-4 py-2">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
