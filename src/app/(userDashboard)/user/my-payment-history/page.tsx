/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

type Payment = {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  paymentGateway: string;
  createdAt: string;
};

export default function UserPaymentsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchPayments();
  }, [user]);

  async function fetchPayments() {
    try {
      const res = await fetch(`${API_BASE}/api/payments/my-transactions`, {
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

  if (!user) {
    return <p className="text-sm text-gray-500">Please login</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">My Payment History</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Transaction</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4">No payments found</td></tr>
            ) : (
              data.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2 text-xs">{p.transactionId}</td>
                  <td className="px-4 py-2">
                    ৳ {p.amount} {p.currency.toUpperCase()}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      p.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs">{p.description}</td>
                  <td className="px-4 py-2 text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
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
