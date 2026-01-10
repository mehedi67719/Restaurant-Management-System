import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFood } from '../../../Components/api';
import Spinner from '../../../Components/Spinner';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageFood = () => {
  const queryClient = useQueryClient();

  const { data: foods, isLoading, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFood,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/food/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update status');
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["foods"]);
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Food item is now ${variables.status}`,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://restaurant-management-system-server-lime.vercel.app/food/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete food');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Food item deleted successfully',
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    },
  });

  const handleApprove = (id) => updateStatusMutation.mutate({ id, status: 'approved' });
  const handleReject = (id) => updateStatusMutation.mutate({ id, status: 'rejected' });
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the food item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Manage Food</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-black border rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, idx) => {
              const status = food.status || 'pending';
              return (
                <tr
                  key={food._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{food.name}</td>
                  <td className="py-3 px-4">${food.price}</td>
                  <td className="py-3 px-4 capitalize">{status}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      disabled={status === 'approved'}
                      onClick={() => handleApprove(food._id)}
                      className={`p-2 rounded-full transition ${status === 'approved' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Approve"
                    >
                      <FaCheckCircle className="text-green-600" size={20} />
                    </button>

                    <button
                      disabled={status === 'rejected'}
                      onClick={() => handleReject(food._id)}
                      className={`p-2 rounded-full transition ${status === 'rejected' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Reject"
                    >
                      <FaTimesCircle className="text-red-600" size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      title="Delete"
                    >
                      <FaTrash size={20} className="text-gray-600" />
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

export default ManageFood;
