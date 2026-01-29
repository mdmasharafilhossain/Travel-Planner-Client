/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Image from "next/image";
import ClientPlanActions from "@/components/modules/plan/ClientPlanActions";
import LoaderWrapper from "@/lib/LoaderWrapper";

type Props = { params: { id: string } };

export default async function PlanDetail({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000"
    }/api/travel-plans/${id}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) return notFound();

  const j = await res.json();

  const plan: ITravelPlan = j.plan || j.data || j.plans || null;

  if (!plan) return notFound();

  const startDate = plan.startDate ? new Date(plan.startDate) : null;
  const endDate = plan.endDate ? new Date(plan.endDate) : null;

  const host = (plan as any).host;

  const normalize = (d: Date | null) => {
    if (!d) return null;
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const today = normalize(new Date()) || new Date();

  const normStart = normalize(startDate);
  const normEnd = normalize(endDate);

  let planStatus = "Active";

  if (normEnd && normEnd < today) {
    planStatus = "Completed";
  } else if (normStart && normStart <= today) {
    planStatus = "Ongoing";
  } else {
    planStatus = "Active";
  }

  return (
    <LoaderWrapper>

      <div className="max-w-4xl mx-auto py-10 px-4 bg-gray-50 dark:bg-gray-900">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Hero */}
          <div className="sm:flex">

            <div className="sm:w-2/5 bg-linear-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">

              <div className="w-full h-44 sm:h-56 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-orange-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10c0 5 4 9 9 9s9-4 9-9"
                  />
                  <path
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v7"
                  />
                </svg>

              </div>

            </div>

            {/* Right */}
            <div className="sm:w-3/5 p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {plan.title || plan.destination}
                  </h1>

                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 max-w-xl">
                    {plan.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-gray-700 text-orange-600 dark:text-orange-400 text-xs font-medium border border-orange-100 dark:border-gray-600">
                      {(plan as any).visibility
                        ? String((plan as any).visibility).toLowerCase()
                        : "public"}
                    </span>

                    {plan.travelType && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium border border-gray-100 dark:border-gray-600">
                        {plan.travelType}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-100 dark:border-gray-600">
                      ID:
                      <span className="font-mono text-xs text-gray-700 dark:text-gray-200">
                        {plan.id}
                      </span>
                    </span>

                  </div>
                </div>

                <div className="text-right">

                  <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                    Status
                  </div>

                  <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-800">
                    {planStatus}
                  </div>

                </div>

              </div>

              {/* Info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Dates
                  </div>

                  <div className="mt-1 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {startDate ? startDate.toLocaleDateString() : "—"}{" "}
                    <span className="text-gray-400">–</span>{" "}
                    {endDate ? endDate.toLocaleDateString() : "—"}
                  </div>

                </div>

                <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Budget
                  </div>

                  <div className="mt-1 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    ৳ {plan.budgetMin ?? 0}{" "}
                    <span className="text-gray-400">—</span> ৳{" "}
                    {plan.budgetMax ?? 0}
                  </div>

                </div>

              </div>

              <div className="mt-6">

                <Link
                  href="/travel-plans"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:shadow-sm transition"
                >
                  ← Back to plans
                </Link>

              </div>

            </div>
          </div>

          {/* Body */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Overview
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {plan.description || "No further details available for this plan."}
            </p>

            {/* Host */}
            <div className="mt-6 p-6 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">

              <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                Host Information
              </h4>

              {!host ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  No host information available.
                </div>
              ) : (
                <div className="sm:flex sm:items-start sm:gap-6">

                  <div className="shrink-0">

                    {host.profileImage ? (
                      <Image
                        width={80}
                        height={80}
                        src={
                          host?.profileImage ||
                          "https://i.ibb.co.com/jvLMWbX0/image.png"
                        }
                        alt={host.fullName || "Host"}
                        className="h-20 w-20 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-linear-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white text-lg font-semibold border border-orange-200">
                        {host.fullName
                          ? String(host.fullName).charAt(0).toUpperCase()
                          : "H"}
                      </div>
                    )}

                  </div>

                  <div className="mt-3 sm:mt-0 flex-1">

                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {host.fullName || host.email}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {host.email}
                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Meta */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Created At
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                  {plan.createdAt
                    ? new Date(plan.createdAt).toLocaleString()
                    : "—"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Updated At
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                  {plan.updatedAt
                    ? new Date(plan.updatedAt).toLocaleString()
                    : "—"}
                </div>
              </div>

            </div>

            {/* Actions */}
            {host && endDate && (
              <ClientPlanActions
                planId={plan.id}
                hostId={host.id}
                planEndDate={endDate.toISOString()}
                planStartDate={startDate ? startDate.toISOString() : null}
              />
            )}

          </div>
        </div>
      </div>

    </LoaderWrapper>
  );
}
