/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

type TourStep = 0 | 1 | 2;

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

 
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState<TourStep>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    
    const seen = window.localStorage.getItem("travelplanner_nav_tour_seen");
    if (!seen) {
      setShowTour(true);
      setTourStep(0);
    }
  }, []);

  const closeTour = () => {
    setShowTour(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("travelplanner_nav_tour_seen", "1");
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
    setTourStep((prev) => (prev === 0 ? prev : ((prev - 1) as TourStep)));
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
     <Loader/>);
  }


  const highlightExplore = showTour && tourStep === 0 ? "ring-2 ring-orange-400 ring-offset-2" : "";
  const highlightPlans = showTour && tourStep === 1 ? "ring-2 ring-orange-400 ring-offset-2" : "";
  const highlightAuth = showTour && tourStep === 2 ? "ring-2 ring-orange-400 ring-offset-2" : "";

  return (
    <nav className="bg-gray-50 border-b border-gray-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-orange-600 font-extrabold text-xl sm:text-2xl tracking-tight"
            >
              TravelPlanner
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className={`text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightExplore}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightExplore}`}
            >
              About
            </Link>
            <Link
              href="/explore"
              className={`text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightExplore}`}
            >
              Explore
            </Link>

            <Link
              href="/travel-plans"
              className={`text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium ${highlightPlans}`}
            >
              All Plans
            </Link>

            {user ? (
              <>
                <Link
                  href="/user"
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                <Link
                  href={`/profile`}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
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
                  className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-600 ${highlightAuth}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {open ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/" 
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 ${highlightExplore}`}
            >
              Home
            </Link>
            <Link
              href="/about" 
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 ${highlightExplore}`}
            >
              About
            </Link>
            <Link
              href="/explore" 
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 ${highlightExplore}`}
            >
              Explore
            </Link>

            <Link
              href="/travel-plans"
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600 ${highlightPlans}`}
            >
              All Plans
            </Link>

            {user ? (
              <>
                <Link
                  href="/user"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                >
                  Dashboard
                </Link>

                <Link
                  href={`/profile`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                >
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="w-full text-left px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-base font-medium ${highlightAuth}`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 border border-gray-200 rounded-md text-base font-medium text-gray-700 hover:border-orange-500 hover:text-orange-600 ${highlightAuth}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🧭 Onboarding Tour Overlay */}
      {showTour && (
        <div className="pointer-events-none fixed inset-0 z-40 flex justify-center items-start mt-20 px-4">
          <div className="pointer-events-auto max-w-md w-full bg-white shadow-xl rounded-lg border border-orange-100 p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
                  Quick Tour {tourStep + 1}/3
                </p>
                {tourStep === 0 && (
                  <>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">Explore Travelers & Buddies</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Use the <span className="font-semibold">Explore</span> menu to find travelers going to similar
                      destinations and discover public travel plans.
                    </p>
                  </>
                )}
                {tourStep === 1 && (
                  <>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">Create, Manage & join Your Plans</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      The <span className="font-semibold">Plans</span> section lets you create and manage your own
                      travel plans with dates, budget, and travel type.also join plans created by others.
                    </p>
                  </>
                )}
                {tourStep === 2 && (
                  <>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">Sign Up to Unlock Features</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Use <span className="font-semibold">Login</span> or <span className="font-semibold">Register</span>{" "}
                      to create an account, save plans, and get matched with travel buddies.
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={closeTour}
                className="text-gray-400 hover:text-gray-600"
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
                    ? "border-gray-200 text-gray-300 cursor-default"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <div className="flex gap-1">
                <button
                  onClick={closeTour}
                  className="px-3 py-1 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-50"
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
