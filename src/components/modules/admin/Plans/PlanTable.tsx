import { TravelPlanProps } from "@/types/travelPlan.interface";

export default function PlanTable({
  plans,
  loading,
  error,
  actionLoadingId,
  onView,
  onEdit,
  onDelete,
}: TravelPlanProps) {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading)
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        Loading plans...
      </div>
    );
  if (error)
    return (
      <div className="rounded-lg border border-red-200 p-6 text-center text-red-600">
        {error}
      </div>
    );
  if (!plans.length)
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        No plans found
      </div>
    );

  return (
  <>
   
    <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
      <table className="min-w-full text-sm">

        <thead className="bg-orange-300 dark:bg-orange-900/40 text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-5 py-4 text-left">Plan</th>
            <th className="px-5 py-4 text-left">Destination</th>
            <th className="px-5 py-4 text-left">Dates</th>
            <th className="px-5 py-4 text-left">Budget</th>
            <th className="px-5 py-4 text-left">Host</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">

          {plans.map(plan => {
            const busy = actionLoadingId === plan.id;

            return (
              <tr
                key={plan.id}
                className="hover:bg-orange-50/40 dark:hover:bg-gray-800 transition"
              >

                {/* Title */}
                <td className="px-5 py-4">
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    {plan.title || "-"}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {plan.id.slice(0, 8)}...
                  </div>
                </td>

               
                <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                  {plan.destination}
                </td>

           
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                  {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
                </td>

              
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                  {plan.budgetMin ?? "-"} – {plan.budgetMax ?? "-"}
                </td>

           
                <td className="px-5 py-4">
                  <div className="text-gray-800 dark:text-gray-100">
                    {plan.host?.fullName || "-"}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {plan.host?.email || ""}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.visibility === "PUBLIC"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {plan.visibility}
                  </span>
                </td>

            
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex gap-2">

                    <button
                      onClick={() => onView(plan)}
                      className="
                        px-3 py-1.5 text-xs rounded-md border
                        border-gray-300 dark:border-gray-600
                        text-gray-700 dark:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-800
                      "
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(plan)}
                      className="
                        px-3 py-1.5 text-xs rounded-md
                        bg-orange-500 hover:bg-orange-600
                        text-white
                      "
                    >
                      Edit
                    </button>

                    <button
                      disabled={busy}
                      onClick={() => onDelete(plan)}
                      className="
                        px-3 py-1.5 text-xs rounded-md
                        bg-red-500 hover:bg-red-600
                        text-white
                        disabled:opacity-50
                      "
                    >
                      {busy ? "..." : "Delete"}
                    </button>

                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>



    <div className="md:hidden space-y-4">

      {plans.map(plan => {
        const busy = actionLoadingId === plan.id;

        return (
          <div
            key={plan.id}
            className="
              rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900
              p-4 shadow
            "
          >

            <div className="flex justify-between items-start">

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  {plan.title || "-"}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {plan.destination}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.visibility === "PUBLIC"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {plan.visibility}
              </span>

            </div>

            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
              Host: {plan.host?.fullName || "-"}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">

              <button
                onClick={() => onView(plan)}
                className="
                  py-2 text-xs rounded-md border
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-800
                "
              >
                View
              </button>

              <button
                onClick={() => onEdit(plan)}
                className="
                  py-2 text-xs rounded-md
                  bg-orange-500 hover:bg-orange-600
                  text-white
                "
              >
                Edit
              </button>

              <button
                disabled={busy}
                onClick={() => onDelete(plan)}
                className="
                  py-2 text-xs rounded-md
                  bg-red-500 hover:bg-red-600
                  text-white
                  disabled:opacity-50
                "
              >
                {busy ? "..." : "Del"}
              </button>

            </div>

          </div>
        );
      })}
    </div>
  </>
);

}
