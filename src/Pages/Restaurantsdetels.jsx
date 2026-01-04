// Restaurantsdetels.jsx
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { 
  FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaClock, FaMoneyBillWave, FaMotorcycle, FaWifi, FaChair, FaCar 
} from 'react-icons/fa';
import { fetchRestaurants } from '../Components/api';
import Spinner from '../Components/Spinner';
import { useParams } from 'react-router';


const Restaurantsdetels = () => {
  const { id } = useParams(); 
  const { data: restaurants, isLoading, isError, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-center text-red-500 mt-10">{error.message}</p>;


  const restaurant = restaurants?.find(r => r._id === id);

  if (!restaurant) 
    return <p className="text-center mt-20 text-gray-600 dark:text-gray-300">Restaurant not found</p>;

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-14 px-4 max-w-[95%] mx-auto">

   
      <div className="flex flex-col bg-gray-100 p-4 rounded-xl dark:bg-black shadow-xl md:flex-row gap-10">
        <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2  flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">{restaurant.name}</h1>
            <p className="text-sm font-semibold text-primary mb-2">{restaurant.category}</p>

            <div className="flex items-center gap-2 mb-4 text-yellow-400">
              {Array.from({ length: Math.round(restaurant.rating) }).map((_, i) => <FaStar key={i} />)}
              <span className="text-gray-800 dark:text-gray-200 font-semibold ml-2">{restaurant.rating}</span>
            </div>

            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaMapMarkerAlt /> {restaurant.location}, {restaurant.address}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaPhoneAlt /> {restaurant.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaEnvelope /> {restaurant.email}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaClock /> Open Hours: {restaurant.openHours}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaMotorcycle /> Delivery: {restaurant.deliveryTime}
            </p>
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <FaMoneyBillWave /> Price Range: {restaurant.priceRange}
            </p>
          </div>

          <button className="btn-primary w-full py-3 rounded-2xl mt-6 text-lg">
            View Menu
          </button>
        </div>
      </div>

      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
        <div className="flex flex-wrap gap-4">
          {(restaurant.amenities || []).map((amenity, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow"
            >
              {amenity === 'Wi-Fi' && <FaWifi />}
              {amenity === 'Outdoor Seating' && <FaChair />}
              {amenity === 'Parking' && <FaCar />}
              <span className="text-gray-800 dark:text-gray-200">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

   
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="flex flex-col gap-6">
          {(restaurant.reviews || []).map((review, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 font-bold">
                  {review?.name}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: Math.round(review.rating) }).map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                    <span className="text-gray-800 dark:text-gray-200 font-semibold ml-1">{review.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment || 'No comment'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurantsdetels;
