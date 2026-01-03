import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "dark" : ""} bg-gray-100 dark:bg-gray-900 px-4 py-16`}>
      <div className="max-w-[95%] mx-auto">
        <div className="flex justify-center items-center mb-12 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Get in Touch</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Have questions or feedback? We’d love to hear from you! Fill out the form or reach us via the contact details.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <FaPhone className="text-blue-600" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-green-600" />
                <span>support@fooddelivery.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-red-600" />
                <span>123 Food Street, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <form className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow hover:shadow-2xl transition flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
            <button className="btn-primary px-6 py-3 font-semibold rounded-lg mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
