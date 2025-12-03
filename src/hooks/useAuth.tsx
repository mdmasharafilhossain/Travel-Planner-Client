/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { AuthAPI } from "@/lib/api";
// import { IUser } from "@/types/user.interface";
// import { useCallback, useEffect, useState } from "react";

// import Swal from "sweetalert2";

// export default function useAuth() {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchMe = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await AuthAPI.me();
//       setUser(res?.data?.data || null);
//       console.log(res?.data, "User Data");
//       console.log(res, "User Res");
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMe();
//   }, [fetchMe]);

//   async function login(email: string, password: string) {
//     const res = await AuthAPI.login({ email, password });
//     await fetchMe();
//     return res.data;
    
//   }

//   async function register(payload: any) {
//     const res = await AuthAPI.register(payload);
//     await fetchMe();
//     return res.data;
//   }

//   async function logout() {
//     try {
//       await AuthAPI.logout();
//     } catch (err) {}
//     setUser(null);
//     Swal.fire("Logged out", "You have been logged out", "success");
//   }

//   return { user, loading, login, register, logout, fetchMe, setUser };
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AuthAPI } from "@/lib/api";
import { IUser } from "@/types/user.interface";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      setLoading(true);
      const res = await AuthAPI.me();
      // adapt to your response shape: res.data.data or res.data.user
      setUser(res.data?.data || res.data?.user || null);
    //   console.log(res.data, "User Data");
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  async function login(email: string, password: string) {
    const res = await AuthAPI.login({ email, password });
    // Try to set user from login response if available
    const loginUser = res.data?.data || res.data?.user || null;
    if (loginUser) {
      setUser(loginUser);
      setLoading(false);
    } else {
      // fallback: fetch /me which will rely on cookie
      await fetchMe();
    }
    return res.data;
  }

  async function register(payload: any) {
    const res = await AuthAPI.register(payload);
    // optionally set user if response returns it
    if (res.data?.data || res.data?.user) {
      setUser(res.data?.data || res.data?.user);
    } else {
      await fetchMe();
    }
    return res.data;
  }

  async function logout() {
    try {
      await AuthAPI.logout();
    } catch (err) {}
    setUser(null);
    Swal.fire("Logged out", "You have been logged out", "success");
  }

  return { user, loading, login, register, logout, fetchMe, setUser };
}
