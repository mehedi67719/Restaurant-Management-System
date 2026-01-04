import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { fetchFood } from "../Components/api";
import Spinner from "../Components/Spinner";
import { Link } from "react-router";

const Foods = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const { data: foods, isLoading, isError, error } = useQuery({
    queryKey: ["Foods"],
    queryFn: fetchFood,
  });

  if (isError) return <div className="text-center mt-20 text-red-500">{error.message}</div>;

  const uniqueCategories = ["All", ...new Set(foods?.map(f => f.category))];

  const filteredFoods = foods
    ?.filter(f =>
      (category === "All" || f.category === category) &&
      f.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-[95%] mx-auto py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Explore Delicious Foods 🍔
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-1/4 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
              >
                {uniqueCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full md:w-1/4 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {filteredFoods && filteredFoods.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredFoods.map(f => (
                  <div
                    key={f._id}
                    className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      className="h-52 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{f.name}</h3>
                      <p className="text-primary font-semibold mb-2">${f.price}</p>
                      <div className="flex items-center gap-1 text-yellow-400 mb-4">
                        {Array.from({ length: Math.round(f.rating) }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div >
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
            ) : (
              <p className="text-center mt-20 text-gray-600 dark:text-gray-300 text-lg">
                No foods found matching your criteria.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Foods;
