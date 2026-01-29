"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
              Travel<span className="text-orange-600">Planner</span>
            </h2>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Find travel buddies, create smart plans, and explore the world
              together. Built for travelers who believe journeys are better
              when shared.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/travel-plans"
                  className="hover:text-orange-600 transition"
                >
                  Travel Plans
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="hover:text-orange-600 transition"
                >
                  Find Travel Buddies
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-orange-600 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-orange-600 transition"
                >
                  Create an Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Travel Highlights
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">

              {[
                { label: "Active plans", value: "120+" },
                { label: "Travel buddies", value: "800+" },
                { label: "Countries", value: "40+" },
                { label: "Trips completed", value: "1.5k+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">

          <p>
            © {new Date().getFullYear()} TravelPlanner. All rights reserved.
          </p>

          <p className="text-gray-400 dark:text-gray-500">
            Made for travelers who love shared journeys.
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
