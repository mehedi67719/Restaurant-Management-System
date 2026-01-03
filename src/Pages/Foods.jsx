import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Foods = () => {
  const [dark, setDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = ["All", "Pizza", "Burger", "Biryani", "Sushi", "Dessert", "Drinks"];

  const foods = [
    { name: "Cheese Pizza", price: 10.99, rating: 4.8, category: "Pizza", image: "https://source.unsplash.com/200x200/?pizza" },
    { name: "Veg Burger", price: 8.99, rating: 4.6, category: "Burger", image: "https://source.unsplash.com/200x200/?burger" },
    { name: "Chicken Biryani", price: 12.99, rating: 4.7, category: "Biryani", image: "https://source.unsplash.com/200x200/?biryani" },
    { name: "Sushi", price: 14.99, rating: 4.5, category: "Sushi", image: "https://source.unsplash.com/200x200/?sushi" },
    { name: "Chocolate Cake", price: 6.99, rating: 4.9, category: "Dessert", image: "https://source.unsplash.com/200x200/?dessert" },
    { name: "Soft Drink", price: 1.99, rating: 4.3, category: "Drinks", image: "https://source.unsplash.com/200x200/?drink" },
  ];

  const filteredFoods = foods
    .filter(f => selectedCategory === "All" || f.category === selectedCategory)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "dark" : ""} bg-gray-100 dark:bg-gray-900 px-4 py-16`}>
      <div className="max-w-[95%] mx-auto">

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Foods</h1>
     
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn-primary px-4 py-2 rounded-full ${selectedCategory === cat ? "bg-blue-600 text-white" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            <select
              className="btn-primary px-4 py-2 rounded-lg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option className="text-black" value="default">Sort By</option>
              <option className="text-black" value="price-asc">Price Low → High</option>
              <option className="text-black" value="price-desc">Price High → Low</option>
              <option className="text-black" value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((f) => (
            <div key={f.name} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
              <img src={f.image} alt={f.name} className="h-40 w-full object-cover rounded mb-4" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{f.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">${f.price}</p>
              <div className="flex items-center gap-1 text-yellow-400 mb-2">
                {Array.from({ length: Math.round(f.rating) }).map((_, i) => <FaStar key={i} />)}
              </div>
              <button className="btn-primary w-full py-2 font-semibold rounded-lg">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="btn-primary px-6 py-3 font-semibold rounded-lg">See All Foods</button>
        </div>

      </div>
    </div>
  );
};

export default Foods;
