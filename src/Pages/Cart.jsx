import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Useauth from "../Hooks/Useauth";
import Spinner from "../Components/Spinner";
import Swal from "sweetalert2";
import { fetchAddToCart } from "../Components/api";

const Cart = () => {
  const { User } = Useauth();
  const queryClient = useQueryClient();

  const {
    data: cart = [],
    isLoading,
  } = useQuery({
    queryKey: ["cart", User?.email],
    queryFn: () => fetchAddToCart(User.email),
    enabled: !!User?.email,
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = async (id) => {
    const res = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      queryClient.invalidateQueries(["cart", User.email]);
      Swal.fire({
        icon: "success",
        title: "Removed from cart",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-[95%] mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Your Cart 🛒
        </h1>

        {isLoading && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {!isLoading && cart.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-10">
            Your cart is empty
          </p>
        )}

        {!isLoading && cart.length > 0 && (
          <>
            <div className="grid gap-6 mt-8">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow p-6"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      className="w-24 h-24 rounded-xl object-cover"
                      alt={item.name}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-300">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Total: ${totalPrice.toFixed(2)}
              </h2>
              <button className="btn-primary mt-4 md:mt-0">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
