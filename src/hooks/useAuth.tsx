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
      setUser(res.data.data || null);
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
    await fetchMe();
    return res.data;
  }

  async function register(payload: any) {
    const res = await AuthAPI.register(payload);
    await fetchMe();
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
