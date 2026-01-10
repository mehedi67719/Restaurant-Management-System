import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchuser,
  fetchFood,
  fetchRestaurants,
  fetchfoodbyemail,
} from "../../Components/api";
import Useauth from "../../Hooks/Useauth";
import Spinner from "../../Components/Spinner";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Profile = () => {
  const { User } = Useauth();

  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchuser,
  });

  const { data: allFoods = [] } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFood,
  });

  const { data: restaurants = [] } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const { data: sellerFoods = [], isLoading: sellerFoodLoading } = useQuery({
    queryKey: ["sellerFoods", User?.email],
    queryFn: () => fetchfoodbyemail(User.email),
    enabled: !!User?.email,
  });

  if (userLoading || sellerFoodLoading) return <Spinner />;

  const currentUser = users.find((u) => u.email === User?.email);
  if (!currentUser) return <div className="text-center mt-10">User not found</div>;

  const foods =
    currentUser.role === "seller" ? sellerFoods : allFoods;

  const approvedFood = foods.filter(
    (f) => f.status === "approved"
  ).length;

  const rejectedFood = foods.filter(
    (f) => f.status === "rejected"
  ).length;

  const pendingFood = foods.filter(
    (f) => !f.status || f.status === "pending"
  ).length;

  const approvedRes = restaurants.filter(
    (r) => r.status === "approved"
  ).length;

  const rejectedRes = restaurants.filter(
    (r) => r.status === "rejected"
  ).length;

  const foodData = [
    { name: "Approved", value: approvedFood },
    { name: "Rejected", value: rejectedFood },
    { name: "Pending", value: pendingFood },
  ];

  const foodColors = ["#22c55e", "#ef4444", "#facc15"];

  const resData = [
    { name: "Approved", value: approvedRes },
    { name: "Rejected", value: rejectedRes },
  ];

  const resColors = ["#3b82f6", "#f97316"]; // Blue and Orange for restaurant status

  return (
    <div className="w-full mx-auto mt-10 p-6 bg-white dark:bg-black rounded-xl shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src={currentUser.photoURL || "https://via.placeholder.com/150"}
          className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold">{currentUser.name}</h2>
        <p className="text-gray-500">{currentUser.email}</p>
        <span className="mt-2 px-4 py-1 bg-orange-500 text-white rounded-full capitalize">
          {currentUser.role}
        </span>
      </div>

      {currentUser.role === "admin" && (
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Food Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={foodData} dataKey="value" outerRadius={80} label>
                  {foodData.map((_, i) => (
                    <Cell key={i} fill={foodColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Restaurant Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={resData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {resData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={resColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {currentUser.role === "seller" && (
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">My Food Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={foodData} dataKey="value" outerRadius={80} label>
                  {foodData.map((_, i) => (
                    <Cell key={i} fill={foodColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold">My Total Foods</h3>
              <p className="text-4xl font-extrabold text-orange-500 mt-2">
                {foods.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {currentUser.role === "user" && (
        <div className="mt-10 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-2">Welcome 🎉</h3>
          <p className="text-gray-600 dark:text-gray-300">
            You can view your orders, track food delivery and manage your profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
