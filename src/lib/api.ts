/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "./baseApi";



export const AuthAPI = {
  login: (payload: any) => axiosClient.post("/api/auth/login", payload),
  register: (payload: any) => axiosClient.post("/api/auth/register", payload),
  me: () => axiosClient.get("/api/auth/me"),
  logout: () => axiosClient.post("/api/auth/logout")
};

export const UserAPI = {
  getProfile: (id: string) => axiosClient.get(`/api/users/${id}`),
  updateProfile: (id: string, payload: any) => axiosClient.patch(`/api/users/${id}`, payload),
  listUsers: (params?: any) => axiosClient.get("/api/users", { params })
};

export const PlansAPI = {
  create: (payload: any) => axiosClient.post("/api/travel-plans", payload),
  list: (params?: any) => axiosClient.get("/api/travel-plans", { params }),
  get: (id: string) => axiosClient.get(`/api/travel-plans/${id}`),
  update: (id: string, payload: any) => axiosClient.patch(`/api/travel-plans/${id}`, payload),
  remove: (id: string) => axiosClient.delete(`/api/travel-plans/${id}`)
};

export const ReviewAPI = {
  add: (payload: any) => axiosClient.post("/api/reviews", payload),
  update: (id: string, payload: any) => axiosClient.patch(`/api/reviews/${id}`, payload),
  remove: (id: string) => axiosClient.delete(`/api/reviews/${id}`)
};

export const PaymentAPI = {
  initSubscription: (payload: any) => axiosClient.post("/api/payments/init-subscription", payload),
  status: (transactionId: string) => axiosClient.get(`/api/payments/status/${transactionId}`),
  adminTransactions: (params?: any) => axiosClient.get("/api/payments/admin/transactions", { params })
};
