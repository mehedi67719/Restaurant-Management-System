import React from "react";
import { useForm } from "react-hook-form";
import Useauth from "../../../Hooks/Useauth";
import Swal from "sweetalert2";


const AddFoods = () => {
  const { User } = Useauth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const foodData = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      image: data.image,
      description: data.description,
      ingredients: data.ingredients.split(",").map(i => i.trim()),
      availability: data.availability,
      prepTime: data.prepTime,
      reviews: [],
      sellerEmail: User?.email,
    };

    const res = await fetch("http://localhost:3000/food", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(foodData),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Food Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto bg-gray-100 dark:bg-gray-900 flex justify-center items-center ">
      <div className="bg-white dark:bg-gray-800 w-full rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          🍕 Add New Food
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Food Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="Margherita Pizza"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Category</label>
            <input
              {...register("category", { required: true })}
              placeholder="Pizza"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              placeholder="8.99"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              {...register("image", { required: true })}
              placeholder="https://images.pexels.com/..."
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Availability</label>
            <select
              {...register("availability")}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Prep Time</label>
            <input
              {...register("prepTime")}
              placeholder="15-20 mins"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              {...register("description")}
              rows="3"
              placeholder="Classic Italian pizza with fresh tomatoes..."
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300">
              Ingredients (comma separated)
            </label>
            <textarea
              {...register("ingredients")}
              rows="2"
              placeholder="Tomato, Mozzarella, Basil, Olive Oil"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full btn-primary">
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoods;
