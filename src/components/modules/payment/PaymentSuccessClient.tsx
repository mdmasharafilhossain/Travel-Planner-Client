/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE } from "@/lib/baseApi";

export default function PaymentSuccessClient() {
  const search = useSearchParams();
  const transactionId = search.get("transactionId") || "";
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;

    async function fetchStatus() {
      try {
        const res = await axios.get(
          `${API_BASE}/api/payments/status/${transactionId}`,
          { withCredentials: true }
        );

        const pay = res.data.data?.payment;

        if (pay?.status) {
          setStatus(pay.status);

          if (pay.status === "PAID") {
            Swal.fire(
              "Payment successful",
              "Your subscription is active.",
              "success"
            );
            clearInterval(interval);

            setTimeout(() => {
              router.push("/user/dashboard");
            }, 2000);
          }
        }
      } catch (err) {
        // console.error(err);
      }
    }

    if (transactionId) {
      fetchStatus();
      interval = setInterval(fetchStatus, 2500);
    } else {
      Swal.fire("Missing transaction", "No transaction id provided", "error");
    }

    return () => {
      clearInterval(interval);
    };
  }, [transactionId, router]);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded shadow text-center border border-gray-200 dark:border-gray-700">

      <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
        {status ? "Payment Successful!" : "Processing Payment..."}
      </h2>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Transaction:{" "}
        <span className="font-mono text-gray-900 dark:text-white">
          {transactionId}
        </span>
      </p>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Status:{" "}
        <strong className="text-gray-900 dark:text-white">
          {status ?? "Checking..."}
        </strong>
      </p>

    </div>
  );
}
