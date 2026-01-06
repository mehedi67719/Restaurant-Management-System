import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchuser, fetchFood, fetchRestaurants } from "../../Components/api";
import Useauth from "../../Hooks/Useauth";
import Spinner from "../../Components/Spinner";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const Profile = () => {
  const { User } = Useauth();

  
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchuser,
  });

 
  const { data: foods, isLoading: foodLoading, isError: foodError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFood,
  });


  const { data: restaurants, isLoading: resLoading, isError: resError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  if (isLoading || foodLoading || resLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;
  if (foodError) return <div className="text-red-500">Error fetching foods</div>;
  if (resError) return <div className="text-red-500">Error fetching restaurants</div>;

  const currentUser = users.find(u => u.email === User.email);
  if (!currentUser) return <div className="text-center text-gray-500 mt-10">User data not found</div>;


  const totalFood = foods.length;
  const approvedFood = foods.filter(f => f.status === "approved").length;
  const rejectedFood = foods.filter(f => f.status === "rejected").length;
  const pendingFood = foods.filter(f => f.status === "pending").length;


  const totalRes = restaurants.length;
  const approvedRes = restaurants.filter(r => r.status === "approved").length;
  const rejectedRes = restaurants.filter(r => r.status === "rejected").length;

  
  const foodPieData = [
    { name: "Approved", value: approvedFood },
    { name: "Rejected", value: rejectedFood },
    { name: "Pending", value: pendingFood }
  ];

  const foodPieColors = ["#00C49F", "#FF4C4C", "#FFBB28"];

  const resBarData = [
    { name: "Total", value: totalRes },
    { name: "Approved", value: approvedRes },
    { name: "Rejected", value: rejectedRes }
  ];

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

    
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
     
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Food Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={foodPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {foodPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={foodPieColors[index % foodPieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

       
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Restaurants Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
