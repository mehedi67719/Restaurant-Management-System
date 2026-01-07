import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { fetchFood } from "../Components/api";
import Spinner from "../Components/Spinner";
import Swal from "sweetalert2";
import Useauth from "../Hooks/Useauth";
import { useParams } from "react-router";

const Fooddetels = () => {
  const { id } = useParams();
  const { User } = Useauth();
  const queryClient = useQueryClient();

  const { data: foods = [], isLoading, isError, error } = useQuery({
    queryKey: ["Foods"],
    queryFn: fetchFood,
  });

  if (isLoading) return <div className="flex justify-center mt-20"><Spinner /></div>;
  if (isError) return <p className="text-center mt-20 text-red-500">{error.message}</p>;

  const food = foods.find(f => f._id === id);
  if (!food) return <p className="text-center mt-20 text-gray-600">Food not found</p>;

  const handeladdtocart = async () => {
    if (!User?.email) {
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login first",
      });
    }

    const cartItem = {
      foodId: food._id,
      name: food.name,
      image: food.image,
      price: food.price,
      quantity: 1,
      userEmail: User.email,
    };

    try {
      const res = await fetch("http://localhost:3000/addtocart", {
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
          text: `${food.name} added to cart`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to add to cart",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-14">
      <div className="max-w-[95%] mx-auto">

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
          {food.name} 🍔
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">

          <div className="w-full lg:w-1/2 max-h-[500px] flex justify-center items-center overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {food.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {food.category}
              </p>

              <p className="text-primary font-semibold text-2xl mb-4">
                ${food.price}
              </p>

              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: Math.round(food.rating || 0) }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="text-gray-600 dark:text-gray-300 ml-2">
                  ({food.reviews ? food.reviews.length : 0} Reviews)
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {food.description}
              </p>

              {food.ingredients && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Ingredients:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {food.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span
                className={`font-semibold ${food.availability === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {food.availability}
              </span>

              <span className="font-medium text-gray-700 dark:text-gray-300">
                Prep Time: {food.prepTime}
              </span>

              <button
                onClick={handeladdtocart}
                className="btn-primary w-full sm:w-auto py-3 px-8 rounded-2xl text-lg mt-3 sm:mt-0"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {food.reviews && food.reviews.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Customer Reviews
            </h3>

            <div className="flex flex-col gap-4">
              {food.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-700 pb-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {rev.name}
                    </h4>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: Math.round(rev.rating) }).map((_, i) => <FaStar key={i} />)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Fooddetels;
