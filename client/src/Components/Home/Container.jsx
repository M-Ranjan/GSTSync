import React from "react";
import { Link } from "react-router-dom";

function Container() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="relative pt-36 ml-auto">
        <div className="lg:w-2/3 text-center mx-auto">
          <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            Effortless GST Compliance,{" "}
            <span className="text-primary dark:text-white">
              Elevated Business Operations
            </span>
          </h1>
          <p className="mt-8 text-gray-700 dark:text-gray-300">
            Take control of your GST processes with GSTSync. Our platform
            provides an easy-to-use interface that integrates seamlessly with
            your business operations, ensuring accurate reporting, efficient
            inventory management, and hassle-free compliance.
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
              <Link
                to="/auth/signup"
                className="relative text-base font-semibold text-white"
              >
                Get started
              </Link>
            </a>
            <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
              <Link
                to="/auth/signin"
                className="relative text-base font-semibold text-primary dark:text-white"
              >
                Login
              </Link>
            </a>
          </div>
          <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                Automated GST Filing
              </h6>
              <p className="mt-2 text-sm text-gray-500">
                Simplify your tax compliance with GSTSync’s automated GST filing
                feature, ensuring timely and accurate submissions with minimal
                effort.
              </p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                Real-Time Inventory Tracking
              </h6>
              <p className="mt-2 text-sm text-gray-500">
                Stay on top of your stock levels with real-time inventory
                tracking, helping you make informed decisions and prevent
                stockouts or overstocking.
              </p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                Customizable Invoice Generation
              </h6>
              <p className="mt-2 text-sm text-gray-500">
                Create professional and personalized invoices with ease using
                our customizable templates, tailored to meet your business’s
                unique needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;