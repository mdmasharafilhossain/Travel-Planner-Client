import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

export default function PlanCard({ plan }: { plan: ITravelPlan }) {
  return (
    <div
      className="
        h-full flex flex-col
        bg-white dark:bg-gray-800 rounded-2xl
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-lg
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
          {plan.title || "Title Unavailable"}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {plan.description || "No description provided for this travel plan."}
        </p>

        {/* Dates */}
        <div className="mt-4 flex items-center gap-2 text-xs font-medium">

          <span className="px-2 py-1 rounded-full bg-orange-50 dark:bg-gray-700 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-gray-600">
            {new Date(plan.startDate).toLocaleDateString()}
          </span>

          <span className="text-gray-400 dark:text-gray-500">→</span>

          <span className="px-2 py-1 rounded-full bg-orange-50 dark:bg-gray-700 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-gray-600">
            {new Date(plan.endDate).toLocaleDateString()}
          </span>

        </div>

        {/* Button */}
        <div className="mt-auto pt-5">
          <Link
            href={`/travel-plans/${plan.id}`}
            className="
              block w-full text-center
              py-2.5 rounded-lg
              bg-gradient-to-r from-orange-500 to-orange-600
              text-white text-sm font-medium
              hover:from-orange-600 hover:to-orange-700
              transition-all duration-200
            "
          >
            View Details →
          </Link>
        </div>

      </div>
    </div>
  );
}
