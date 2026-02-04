import PaymentSuccessClient from "@/components/modules/payment/PaymentSuccessClient";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded shadow text-center border border-gray-200 dark:border-gray-700">
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Processing Payment...
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Please wait while we verify your payment.
          </p>

        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
