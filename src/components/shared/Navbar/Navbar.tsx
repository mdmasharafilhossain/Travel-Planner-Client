"use client";
// // components/Navbar.tsx
// "use client";
// import Link from "next/link";
// import useAuth from "../hooks/useAuth";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   return (
//     <nav className="bg-white shadow">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <Link href="/"><a className="font-bold text-xl">TravelPlanner</a></Link>
//         <div className="flex items-center gap-4">
//           <Link href="/explore"><a>Explore</a></Link>
//           <Link href="/travel-plans"><a>Plans</a></Link>

//           {user ? (
//             <>
//               <Link href="/dashboard"><a>Dashboard</a></Link>
//               <Link href={`/profile/${user.id}`}><a>Profile</a></Link>
//               {user.role === "ADMIN" && <Link href="/admin/transactions"><a>Admin</a></Link>}
//               <button onClick={() => { logout(); router.push("/"); }} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link href="/login"><a className="px-3 py-1 bg-indigo-600 text-white rounded">Login</a></Link>
//               <Link href="/register"><a className="px-3 py-1 border rounded">Register</a></Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

const Navbar = () => {
    return (
        <div>
            <h1>Navbar Page</h1>
        </div>
    );
};

export default Navbar;
