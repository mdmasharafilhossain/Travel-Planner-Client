import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

export default function PlanCard({ plan }: { plan: ITravelPlan }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      
      {/* Top Section: Title & Description */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {plan.title || plan.destination}
        </h3>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {plan.description}
        </p>

        {/* Dates */}
        <div className="mt-3 text-xs font-medium text-gray-500 flex items-center gap-2">
          <span className="bg-orange-50 px-2 py-1 rounded text-orange-600 border border-orange-200">
            {new Date(plan.startDate).toLocaleDateString()}
          </span>
          <span className="text-gray-400">→</span>
          <span className="bg-orange-50 px-2 py-1 rounded text-orange-600 border border-orange-200">
            {new Date(plan.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Bottom Section: CTA Button */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Link
          href={`/travel-plans/${plan.id}`}
          className="inline-block w-full text-center py-2 rounded-md 
                     bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white text-sm font-medium
                     hover:from-orange-600 hover:to-orange-700 
                     transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
