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
      {/* Desktop table */}
      <div className="hidden md:block rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Dates</th>
              <th className="px-4 py-3 text-left">Budget</th>
              <th className="px-4 py-3 text-left">Host</th>
              <th className="px-4 py-3 text-left">Visibility</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => {
              const busy = actionLoadingId === plan.id;
              return (
                <tr
                  key={plan.id}
                  className="border-t last:border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">
                      {plan.title || "-"}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {plan.id.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {plan.destination}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {plan.budgetMin != null ? plan.budgetMin : "-"} –{" "}
                    {plan.budgetMax != null ? plan.budgetMax : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div>{plan.host?.fullName || "-"}</div>
                    <div className="text-xs text-gray-500">
                      {plan.host?.email || ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                        plan.visibility === "PUBLIC"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {plan.visibility}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onView(plan)}
                        className="px-3 py-1 rounded-md text-xs border border-gray-200 hover:bg-gray-50"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(plan)}
                        className="px-3 py-1 rounded-md text-xs bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100"
                      >
                        Edit
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => onDelete(plan)}
                        className="px-3 py-1 rounded-md text-xs bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
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

      {/* Mobile list */}
      <div className="md:hidden space-y-3">
        {plans.map(plan => {
          const busy = actionLoadingId === plan.id;
          return (
            <div
              key={plan.id}
              className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-800">
                    {plan.title || "-"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {plan.destination}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                    plan.visibility === "PUBLIC"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {plan.visibility}
                </span>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Host: {plan.host?.fullName || "-"} ({plan.host?.email || ""})
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onView(plan)}
                  className="flex-1 px-3 py-2 rounded-md text-xs border border-gray-200 hover:bg-gray-50"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(plan)}
                  className="flex-1 px-3 py-2 rounded-md text-xs bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-100"
                >
                  Edit
                </button>
                <button
                  disabled={busy}
                  onClick={() => onDelete(plan)}
                  className="px-3 py-2 rounded-md text-xs bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
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
