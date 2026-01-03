import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Useauth from "../../Hooks/Useauth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Signup = () => {
  const { createaccountwithemail, loginwithgoogle } = Useauth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
      });
      return;
    }
    try {
      const user = await createaccountwithemail(
        data.email,
        data.password,
        data.name
      );
      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: `Welcome, ${data.name}!`,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await loginwithgoogle();
      Swal.fire({
        icon: "success",
        title: "Signed in with Google",
        text: `Welcome, ${result.user.displayName}!`,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign In Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Create Your Account
        </h1>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full px-4 py-2 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle size={24} className="mr-3" />
          Sign in with Google
        </button>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">Full Name is required</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: true, validate: value => value === password })}
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-orange-500 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
