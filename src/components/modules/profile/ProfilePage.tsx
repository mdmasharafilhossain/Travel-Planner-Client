// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import useAuth from "@/hooks/useAuth";
// import { UserAPI} from "@/lib/api"; // make sure lib/api exports axiosClient and UserAPI
// import Swal from "sweetalert2";
// import Image from "next/image";
// import ProfileForm from "./ProfileForm";
// import ChangePasswordForm from "./ChangePasswordForm";



// export default function ProfilePage() {
//   const { user, loading, setUser } = useAuth();
//   const [profile, setProfile] = useState<any | null>(null);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [pwdOpen, setPwdOpen] = useState(false);

//   // Load freshest profile from server using axios
//   useEffect(() => {
//     if (!user?.id) {
//       setProfile(null);
//       return;
//     }

//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingProfile(true);
//         const res = await UserAPI.getProfile(user.id);
//         if (!mounted) return;
//         // adapt to your API shape
//         const data = res.data?.data || res.data?.user || res.data || null;
//         setProfile(data);
//       } catch (err: any) {
//         console.error("Failed to load profile:", err);
//         Swal.fire("Error", err?.response?.data?.message || err?.message || "Failed to load profile", "error");
//       } finally {
//         if (mounted) setLoadingProfile(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, [user?.id]);

//   // update global user when profile updated (ProfileForm will call this via callback)
//   function handleProfileUpdated(updated: any) {
//     setProfile((p: any) => ({ ...(p || {}), ...(updated || {}) }));
//     setUser((prev: any) => ({ ...(prev || {}), ...(updated || {}) }));
//   }

//   if (loading || loadingProfile) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="animate-spin h-8 w-8 border-4 border-orange-400 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   const u = profile || user;

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-4">
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//         <div className="p-6 sm:flex sm:items-start sm:gap-6">
//           <div className="flex-shrink-0">
//             {u?.profileImage ? (
//               <Image src={u.profileImage} alt={u.fullName || u.email} className="h-28 w-28 rounded-full object-cover border border-gray-200" />
//             ) : (
//               <div className="h-28 w-28 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold border border-orange-200">
//                 {u?.fullName ? String(u.fullName).charAt(0).toUpperCase() : "U"}
//               </div>
//             )}
//           </div>

//           <div className="mt-4 sm:mt-0 flex-1">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl font-extrabold text-gray-900">{u?.fullName || "Unnamed User"}</h2>
//                 <p className="text-sm text-gray-500 mt-1">{u?.email}</p>

//                 <div className="mt-3 flex flex-wrap items-center gap-2">
//                   <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
//                     Role: {u?.role ?? "USER"}
//                   </span>

//                   <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
//                     u?.isPremium ? "bg-yellow-50 text-yellow-700 border-yellow-100" : "bg-gray-50 text-gray-700 border-gray-100"
//                   }`}>
//                     {u?.isPremium ? "Premium" : "Free"}
//                   </span>

//                   <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
//                     u?.isVerifiedBadge ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-gray-50 text-gray-600 border-gray-100"
//                   }`}>
//                     {u?.isVerifiedBadge ? "Verified" : "Not verified"}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setEditOpen(true)}
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition"
//                 >
//                   Edit profile
//                 </button>

//                 <button
//                   onClick={() => setPwdOpen(true)}
//                   className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:shadow-sm transition"
//                 >
//                   Change password
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
//               <div>
//                 <div className="text-xs text-gray-500">Current location</div>
//                 <div className="mt-1">{u?.currentLocation ?? "—"}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Member since</div>
//                 <div className="mt-1">{u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="text-xs text-gray-500">Bio</div>
//               <div className="mt-1 text-sm text-gray-700">{u?.bio ?? <span className="text-gray-500">No bio provided.</span>}</div>
//             </div>

//             <div className="mt-4">
//               <div className="text-xs text-gray-500">Travel interests</div>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {Array.isArray(u?.travelInterests) && u.travelInterests.length > 0 ? (
//                   u.travelInterests.map((t: string, i: number) => (
//                     <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700 border border-gray-200">{t}</span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500">—</span>
//                 )}
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="text-xs text-gray-500">Visited countries</div>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {Array.isArray(u?.visitedCountries) && u.visitedCountries.length > 0 ? (
//                   u.visitedCountries.map((c: string, i: number) => (
//                     <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700 border border-gray-200">{c}</span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500">—</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 border-t border-gray-100 bg-white">
//           <div className="text-sm text-gray-500">Last updated: {u?.updatedAt ? new Date(u.updatedAt).toLocaleString() : "—"}</div>
//         </div>
//       </div>

//       {/* Modals */}
//       {editOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setEditOpen(false)} />
//           <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="p-6">
//               <ProfileForm
//                 defaultValues={u}
//                 onSuccess={(updated) => {
//                   handleProfileUpdated(updated);
//                   setEditOpen(false);
//                 }}
//                 onCancel={() => setEditOpen(false)}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {pwdOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setPwdOpen(false)} />
//           <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="p-6">
//               <ChangePasswordForm
//                 userId={u?.id}
//                 onSuccess={() => {
//                   Swal.fire("Success", "Password changed", "success");
//                   setPwdOpen(false);
//                 }}
//                 onCancel={() => setPwdOpen(false)}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AuthAPI } from "@/lib/api";

export default function ProfilePage() {
  // source of truth: user from useAuth
  const { user, loading, setUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-orange-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const u = user;

  // Called when ProfileForm returns updated data — update global user using setUser
  async function handleProfileUpdated(updated: any) {
  // if update operation returned nothing useful, bail
  if (!updated) return;

  try {
    // fetch a fresh, server-side user object (guaranteed to be plain JSON)
    const res = await AuthAPI.me(); // ensure AuthAPI.me() exists and returns { data: { data: user } } or similar
    const fresh = res.data?.data || res.data?.user || res.data || null;
    if (fresh) {
      setUser(fresh as any); // cast to any or to your IUser type
      return;
    }
  } catch (err) {
    console.error("Failed to refresh /me after profile update:", err);
    // fallback: try to merge only plain properties (safe shallow merge)
    try {
      const safe = { ...(user || {}) };
      for (const k of Object.keys(updated)) {
        const val = (updated as any)[k];
        // only copy primitives & plain objects/arrays (avoid functions)
        if (val === null) {
          (safe as any)[k] = val;
        } else if (typeof val === "object") {
          try {
            // try JSON round-trip as quick plain-object test
            (safe as any)[k] = JSON.parse(JSON.stringify(val));
          } catch {
            // skip complex/circular values
          }
        } else {
          (safe as any)[k] = val;
        }
      }
      setUser(safe as any);
      return;
    } catch (e) {
      console.error("Fallback merge failed:", e);
    }
  }
}

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 sm:flex sm:items-start sm:gap-6">
          <div className="shrink-0">
            {u?.profileImage ? (
              <Image
                src={u.profileImage}
                alt={u.fullName || u.email}
                width={112}
                height={112}
                className="rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold border border-orange-200">
                {u?.fullName ? String(u.fullName).charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{u?.fullName || "Unnamed User"}</h2>
                <p className="text-sm text-gray-500 mt-1">{u?.email}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                    Role: {u?.role ?? "USER"}
                  </span>

                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                    u?.isPremium ? "bg-yellow-50 text-yellow-700 border-yellow-100" : "bg-gray-50 text-gray-700 border-gray-100"
                  }`}>
                    {u?.isPremium ? "Premium" : "Free"}
                  </span>

                  {/* <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                    u?.isVerifiedBadge ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-gray-50 text-gray-600 border-gray-100"
                  }`}>
                    {u?.isVerifiedBadge ? "Verified" : "Not verified"}
                  </span> */}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition"
                >
                  Edit profile
                </button>

                <button
                  onClick={() => setPwdOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-sm text-gray-700 hover:shadow-sm transition"
                >
                  Change password
                </button>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-500">Current location</div>
                <div className="mt-1">{u?.currentLocation ?? "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Member since</div>
                <div className="mt-1">{u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">Bio</div>
              <div className="mt-1 text-sm text-gray-700">{u?.bio ?? <span className="text-gray-500">No bio provided.</span>}</div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">Travel interests</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(u?.travelInterests) && u.travelInterests.length > 0 ? (
                  u.travelInterests.map((t: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700 border border-gray-200">{t}</span>
                  ))
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">Visited countries</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(u?.visitedCountries) && u.visitedCountries.length > 0 ? (
                  u.visitedCountries.map((c: string, i: number) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700 border border-gray-200">{c}</span>
                  ))
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="text-sm text-gray-500">Last updated: {u?.updatedAt ? new Date(u.updatedAt).toLocaleString() : "—"}</div>
        </div>
      </div>

      {/* Modals */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <ProfileForm
                defaultValues={u}
                onSuccess={(updated) => {
                  handleProfileUpdated(updated); // update global user via setUser
                  setEditOpen(false);
                }}
                onCancel={() => setEditOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {pwdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPwdOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <ChangePasswordForm
                userId={u?.id}
                onSuccess={() => {
                  Swal.fire("Success", "Password changed", "success");
                  setPwdOpen(false);
                }}
                onCancel={() => setPwdOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
