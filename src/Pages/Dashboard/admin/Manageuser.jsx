import React from 'react';
import { fetchuser } from '../../../Components/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '../../../Components/Spinner';
import { FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Manageuser = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchuser,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await fetch(`http://localhost:3000/users/role/${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update role');
      }
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: 'success',
        title: 'Role Updated',
        text: `${variables.email} is now ${variables.role}`,
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

  const handleRoleChange = (email, newRole) => {
    updateRoleMutation.mutate({ email, role: newRole });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-black border rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const role = user.role || 'user';

              return (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{role}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      disabled={role === 'user'}
                      onClick={() => handleRoleChange(user.email, 'user')}
                      className={`p-2 rounded-full transition ${role === 'user' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Set as User"
                    >
                      <FaUser size={20} className="text-gray-600" />
                    </button>

                    <button
                      disabled={role === 'admin'}
                      onClick={() => handleRoleChange(user.email, 'admin')}
                      className={`p-2 rounded-full transition ${role === 'admin' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Set as Admin"
                    >
                      <FaUserShield size={20} className="text-blue-600" />
                    </button>

                    <button
                      disabled={role === 'seller'}
                      onClick={() => handleRoleChange(user.email, 'seller')}
                      className={`p-2 rounded-full transition ${role === 'seller' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Set as Seller"
                    >
                      <FaUserTie size={20} className="text-green-600" />
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

export default Manageuser;
