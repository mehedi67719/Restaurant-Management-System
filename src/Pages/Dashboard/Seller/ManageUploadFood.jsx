import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchfoodbyemail } from '../../../Components/api';
import Useauth from '../../../Hooks/Useauth';
import Spinner from '../../../Components/Spinner';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageUploadFood = () => {
  const { User } = Useauth();

  const { data: Foods = [], isLoading } = useQuery({
    queryKey: ["FilterFood", User?.email],
    queryFn: () => fetchfoodbyemail(User.email),
    enabled: !!User?.email,
  });

  if (isLoading) return <Spinner />;

  const handleDelete = (id) => {
    console.log("Delete food:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit food:", id);
  };

  return (
    <div className="min-h-screen w-full mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Uploaded Foods</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="px-4 py-3 border-b">Image</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Category</th>
              <th className="px-4 py-3 border-b">Price ($)</th>
              <th className="px-4 py-3 border-b">Prep Time</th>
              <th className="px-4 py-3 border-b">Availability</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Foods.map((food) => (
              <tr key={food._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3">
                  <img src={food.image} alt={food.name} className="w-20 h-20 object-cover rounded" />
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.category}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.price}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.prepTime}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{food.availability}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {food.status ? food.status : "Pending"}
                </td>
                <td className="px-4 py-3 flex justify-center items-center gap-2 text-gray-900 dark:text-white">
                  {food.status && food.status.toLowerCase() === "approved" ? (
                    <button onClick={() => handleDelete(food._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                      <FaTrash />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(food._id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(food._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUploadFood;
