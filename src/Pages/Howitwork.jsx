import React, { useState } from "react";
import { FaUtensils, FaShoppingCart, FaTruck, FaSmile } from "react-icons/fa";

const Howitwork = () => {
  const [dark, setDark] = useState(false);

  const steps = [
    { icon: <FaUtensils size={40} className="text-blue-600" />, title: "Browse Restaurants", desc: "Find restaurants and foods you love" },
    { icon: <FaShoppingCart size={40} className="text-green-600" />, title: "Choose Your Food", desc: "Select from a wide range of meals" },
    { icon: <FaTruck size={40} className="text-orange-600" />, title: "Place an Order", desc: "Confirm your order easily" },
    { icon: <FaSmile size={40} className="text-red-600" />, title: "Enjoy Delivery", desc: "Get food delivered fast to your door" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "dark" : ""} bg-gray-100 dark:bg-gray-900 px-4 py-16`}>
      
      <div className="max-w-[95%] mx-auto">
        <div className="flex justify-center items-center mb-12 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">How It Works</h1>
        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow hover:shadow-2xl transition transform hover:-translate-y-2 text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Follow these simple steps and enjoy delicious food delivered right to your door!
          </p>
          <button className="btn-primary px-6 py-3 font-semibold rounded-lg">
            Start Ordering
          </button>
        </div>
      </div>
    </div>
  );
};

export default Howitwork;
