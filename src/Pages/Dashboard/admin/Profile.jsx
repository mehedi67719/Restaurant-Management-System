import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchuser } from '../../../Components/api';
import Useauth from '../../../Hooks/Useauth';
import Spinner from '../../../Components/Spinner';

const Profile = () => {
  const { User } = Useauth();


    const { data: foods, isLoading: foodLoading, isError: foodError, error: foodErrMsg } = useQuery({
    queryKey: ["Foods"],
    queryFn: fetchapproveFood,
  });

  const { data: restaurants, isLoading: resLoading, isError: resError, error: resErrMsg } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchapproveRestaurants,
  });

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchuser,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  const currentUser = users.find(u => u.email === User.email);

  if (!currentUser) {
    return <div className="text-center text-gray-500 mt-10">User data not found</div>;
  }

  return (
    <div className="max-w-[95%] mx-auto mt-10 p-6 bg-white dark:bg-black shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={currentUser.photoURL || "https://via.placeholder.com/150"}
          alt={currentUser.name}
          className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">{currentUser.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
        <span className="mt-2 px-4 py-1 rounded-full text-white bg-blue-600 capitalize">{currentUser.role}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">User Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">User ID</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{currentUser.uid}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{currentUser.name}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{currentUser.email}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Role</p>
            <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
