import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Spinner from "../Components/Spinner";
import { Link } from "react-router";
import { fetchapproveRestaurants } from "../Components/api";

const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: restaurants, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchapproveRestaurants,
  });

  const categories = useMemo(() => {
    if (!restaurants) return ["All"];
    const uniqueCategories = Array.from(
      new Set(restaurants.map((r) => r.category))
    );
    return ["All", ...uniqueCategories];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants?.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || r.category === category;
      return matchSearch && matchCategory;
    });
  }, [restaurants, search, category]);

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">{error.message}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-[95%] mx-auto py-14">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Premium Restaurants Experience
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Discover top-rated food places near you
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Search restaurant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none shadow-sm"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-1/4 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none shadow-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {filteredRestaurants && filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredRestaurants.map((r) => (
                  <div
                    key={r._id}
                    className="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {r.isOpen ? (
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-xl font-semibold">
                          Open
                        </span>
                      ) : (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-xl font-semibold">
                          Closed
                        </span>
                      )}
                    </div>

                    <div className="p-7">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {r.name}
                        </h3>
                        <p className="text-black bg-orange-400 py-0.5 px-2 rounded-xl font-semibold text-sm">
                          ⭐ {r.rating}
                        </p>
                      </div>

                      <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <FaMapMarkerAlt /> {r.location}
                      </p>

                      <div className="flex justify-between items-center mb-6">
                        <span className="inline-block text-sm font-semibold text-primary">
                          {r.category}
                        </span>
                        <span className="inline-block text-sm font-semibold text-gray-500 dark:text-gray-400">
                          {r.reviews ? r.reviews.length : 0} Reviews
                        </span>
                      </div>

                      
                        <Link to={`/restaurants/${r._id}`} className="btn-primary w-full py-3 rounded-2xl text-lg">View Details</Link>
                     
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300 mt-20 text-lg">
                No restaurants found matching your criteria.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
