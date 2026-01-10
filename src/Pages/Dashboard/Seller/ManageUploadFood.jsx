import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchfoodbyemail } from "../../../Components/api";
import Useauth from "../../../Hooks/Useauth";
import Spinner from "../../../Components/Spinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageUploadFood = () => {
  const { User } = Useauth();
  const queryClient = useQueryClient();
  const [editFood, setEditFood] = useState(null);

  const { data: Foods = [], isLoading } = useQuery({
    queryKey: ["FilterFood", User?.email],
    queryFn: () => fetchfoodbyemail(User.email),
    enabled: !!User?.email,
  });

  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <Spinner />;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this food?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/food/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Food Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["FilterFood"]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
        });
      }
    }
  };

  const handleEditOpen = (food) => {
    setEditFood(food);
    reset({
      name: food.name,
      category: food.category,
      price: food.price,
      image: food.image,
      prepTime: food.prepTime,
      availability: food.availability,
    });
  };

  const handleEditSubmit = async (data) => {
    const updatedFood = {
      ...data,
      price: parseFloat(data.price),
    };

    const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/food/${editFood._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedFood),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Food Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditFood(null);
      queryClient.invalidateQueries(["FilterFood"]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Manage Uploaded Foods
      </h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Foods.map((food) => (
              <tr key={food._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.category}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">${food.price}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {food.status ? food.status : "Pending"}
                </td>
                <td className="px-4 py-3 flex justify-center items-center gap-2 text-gray-900 dark:text-white">
                  {food.status !== "approved" && (
                    <button
                      onClick={() => handleEditOpen(food)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editFood && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border-2 border-orange-400">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-5 text-white text-center">
              <h2 className="text-2xl font-bold">Edit Food Item</h2>
            </div>

            <form
              onSubmit={handleSubmit(handleEditSubmit)}
              className="p-6 grid md:grid-cols-2 gap-5"
            >
              <input {...register("name")} className="border p-2 rounded" placeholder="Food Name" />
              <input {...register("category")} className="border p-2 rounded" placeholder="Category" />
              <input type="number" {...register("price")} className="border p-2 rounded" placeholder="Price" />
              <input {...register("image")} className="border p-2 rounded" placeholder="Image URL" />
              <input {...register("prepTime")} className="border p-2 rounded" placeholder="Prep Time" />
              <select {...register("availability")} className="border p-2 rounded">
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>

              <div className="md:col-span-2 flex gap-4 mt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold"
                >
                  Update Food
                </button>
                <button
                  type="button"
                  onClick={() => setEditFood(null)}
                  className="w-full py-3 rounded-xl bg-gray-300 dark:bg-gray-700 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUploadFood;
