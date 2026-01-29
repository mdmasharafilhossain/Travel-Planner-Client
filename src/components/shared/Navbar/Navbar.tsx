/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import ThemeToggle from "@/components/modules/homePage/ThemeToggle";

type TourStep = 0 | 1 | 2;

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState<TourStep>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = window.localStorage.getItem(
      "travelplanner_nav_tour_seen"
    );
    if (!seen) {
      setShowTour(true);
      setTourStep(0);
    }
  }, []);

  const closeTour = () => {
    setShowTour(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "travelplanner_nav_tour_seen",
        "1"
      );
    }
  };

  const nextStep = () => {
    setTourStep((prev) => {
      if (prev === 2) {
        closeTour();
        return prev;
      }
      return (prev + 1) as TourStep;
    });
  };

  const prevStep = () => {
    setTourStep((prev) =>
      prev === 0 ? prev : ((prev - 1) as TourStep)
    );
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return <Loader />;
  }

  const highlightExplore =
    showTour && tourStep === 0
      ? "ring-2 ring-orange-400 ring-offset-2"
      : "";

  const highlightPlans =
    showTour && tourStep === 1
      ? "ring-2 ring-orange-400 ring-offset-2"
      : "";

  const highlightAuth =
    showTour && tourStep === 2
      ? "ring-2 ring-orange-400 ring-offset-2"
      : "";

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-orange-600 font-extrabold text-xl sm:text-2xl tracking-tight"
            >
              TravelPlanner
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">

            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
              { href: "/explore", label: "Explore" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 dark:text-gray-200 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightExplore}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/travel-plans"
              className={`text-gray-700 dark:text-gray-200 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightPlans}`}
            >
              All Plans
            </Link>

            <ThemeToggle />

            {user ? (
              <>
                <Link
                  href="/user"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  User Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-gray-700 dark:text-gray-200 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium ${highlightAuth}`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className={`px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-orange-500 hover:text-orange-600 ${highlightAuth}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 pt-4 pb-6 space-y-2">

            {[
              "/", "/about", "/faq", "/explore"
            ].map((path) => (
              <Link
                key={path}
                href={path}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${highlightExplore}`}
              >
                {path === "/" ? "Home" : path.slice(1).toUpperCase()}
              </Link>
            ))}

            <Link
              href="/travel-plans"
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${highlightPlans}`}
            >
              All Plans
            </Link>

            <ThemeToggle />

            {user ? (
              <>
                <Link
                  href="/user"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  User Dashboard
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 bg-orange-600 text-white rounded-md"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tour Modal */}
       {showTour && (
  <div className="pointer-events-none fixed inset-0 z-40 flex justify-center items-start mt-20 px-4 bg-black/20 dark:bg-black/50">
    <div className="pointer-events-auto max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-orange-100 dark:border-gray-700 p-4">

      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
            Quick Tour {tourStep + 1}/3
          </p>

          {tourStep === 0 && (
            <>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                Explore Travelers & Others Common Routes
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Use the <span className="font-semibold">Explore</span> menu to find travelers going to similar
                destinations and discover public travel plans.
              </p>
            </>
          )}

          {tourStep === 1 && (
            <>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                Create & Manage Your Plans
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                The <span className="font-semibold">Plans</span> section lets you create and manage your own
                travel plans with dates, budget, and travel type.
              </p>
            </>
          )}

          {tourStep === 2 && (
            <>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                Sign Up to Unlock Features
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Use <span className="font-semibold">Login</span> or{" "}
                <span className="font-semibold">Register</span> to create an account, save plans, and get matched with travel buddies.
              </p>
            </>
          )}
        </div>

        <button
          onClick={closeTour}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close tour"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center">

        <button
          onClick={prevStep}
          disabled={tourStep === 0}
          className={`px-3 py-1 rounded-md text-xs font-medium border ${
            tourStep === 0
              ? "border-gray-200 text-gray-300 cursor-default dark:border-gray-600 dark:text-gray-500"
              : "border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Previous
        </button>

        <div className="flex gap-1">

          <button
            onClick={closeTour}
            className="px-3 py-1 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Skip
          </button>

          <button
            onClick={nextStep}
            className="px-3 py-1 rounded-md text-xs font-medium bg-orange-600 text-white hover:bg-orange-700"
          >
            {tourStep === 2 ? "Finish" : "Next"}
          </button>

        </div>
      </div>

    </div>
  </div>
)}

    </nav>
  );
}
