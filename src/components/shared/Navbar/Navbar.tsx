"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link href="/explore" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Explore
            </Link>

            <Link href="/travel-plans" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Plans
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>

                <Link href={`/profile/${user.id}`} className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link href="/admin/transactions" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
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
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-orange-500 hover:text-orange-600"
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
              {/* Icon: hamburger / X */}
              {open ? (
                // X icon
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
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
            <Link href="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600">
              Explore
            </Link>

            <Link href="/travel-plans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600">
              Plans
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600">
                  Dashboard
                </Link>

                <Link href={`/profile/${user.id}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600">
                  Profile
                </Link>

                {user.role === "ADMIN" && (
                  <Link href="/admin/transactions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600">
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
                <Link href="/login" className="block px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-base font-medium">
                  Login
                </Link>

                <Link href="/register" className="block px-3 py-2 border border-gray-200 rounded-md text-base font-medium text-gray-700 hover:border-orange-500 hover:text-orange-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
