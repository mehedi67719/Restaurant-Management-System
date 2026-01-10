import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { fetchRestaurants } from '../../../Components/api';
import Spinner from '../../../Components/Spinner';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageRestaurants = () => {
  const queryClient = useQueryClient();

  const { data: restaurants, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

 
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/restaurant/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
    },
  });

  
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/restaurant/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
    },
  });

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          Swal.fire("Success", `Status changed to ${newStatus}`, "success");
        },
        onError: (err) => {
          Swal.fire("Error", err.message || "Something went wrong", "error");
        },
      }
    );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this restaurant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => Swal.fire("Deleted!", "Restaurant deleted.", "success"),
          onError: (err) => Swal.fire("Error", err.message || "Failed to delete", "error"),
        });
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Manage Restaurants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-black border rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, idx) => {
              const status = restaurant.status || "pending";
              return (
                <tr key={restaurant._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{restaurant.name}</td>
                  <td className="py-3 px-4">{restaurant.email}</td>
                  <td className="py-3 px-4 capitalize">{status}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      disabled={status === "approved"}
                      onClick={() => handleStatusChange(restaurant._id, "approved")}
                      className={`p-2 rounded-full transition ${status === "approved" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                      title="Approve"
                    >
                      <FaCheckCircle className="text-green-600" size={20} />
                    </button>

                    <button
                      disabled={status === "rejected"}
                      onClick={() => handleStatusChange(restaurant._id, "rejected")}
                      className={`p-2 rounded-full transition ${status === "rejected" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                      title="Reject"
                    >
                      <FaTimesCircle className="text-red-600" size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(restaurant._id)}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      title="Delete"
                    >
                      <FaTrash className="text-gray-800" size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRestaurants;
