/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function AdminTransactionsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    try {
      const res = await fetch(`${API_BASE}/api/payments/admin/transactions`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.ok) setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!user || user.role !== "ADMIN") {
    return <p className="text-red-600">Admin access only</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Transaction</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
            ) : (
              data.map(tx => (
                <tr key={tx.id} className="border-t">
                  <td className="px-4 py-2 text-xs">{tx.transactionId}</td>
                  <td className="px-4 py-2 text-xs">{tx.user?.email}</td>
                  <td className="px-4 py-2">৳ {tx.amount}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      tx.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs">{tx.description}</td>
                  <td className="px-4 py-2 text-xs">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
