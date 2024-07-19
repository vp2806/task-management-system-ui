import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="flex justify-center items-center h-screen p-16 bg-gray-50 dark:bg-gray-900">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn't find this page.
          </p>
          <Link
            to="/"
            className="text-center w-full text-gray-900 bg-gray-50 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointe"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
