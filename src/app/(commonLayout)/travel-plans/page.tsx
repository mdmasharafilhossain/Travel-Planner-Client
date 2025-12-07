

import PlanCard from "@/components/modules/plan/PlanCard";
import AuthWrapper from "@/lib/AuthWrapper";
import { API_BASE } from "@/lib/baseApi";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

export default async function PlansPage() {
  const res = await fetch(
    `${API_BASE}/api/travel-plans`,
    {cache: "no-store",}
  );
  const json = await res.json();

  const plans: ITravelPlan[] = json.plans || [];

  return (
   

        <div className="min-h-screen px-4 md:px-8 py-6">

      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Travel Plans</h2>
          <p className="text-gray-500 text-sm mt-1">
            Explore your saved trips and upcoming adventures.
          </p>
        </div>

        <Link
          href="/travel-plans/add"
          className="px-4 py-2 rounded-md bg-linear-to-r from-orange-500 to-orange-600 
                     text-white font-medium hover:from-orange-600 hover:to-orange-700 
                     transition"
        >
          + Add New Plan
        </Link>
      </div>

     
      {plans.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-8 w-8 text-orange-500"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor">
              <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 10c0 5 4 9 9 9s9-4 9-9"/>
              <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 3v7"/>
            </svg>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            No travel plans yet
          </h3>
          <p className="text-gray-500 text-sm mt-1 max-w-sm">
            Start planning your next adventure by adding your first trip.
          </p>

          <Link
            href="/travel-plans/add"
            className="mt-4 px-5 py-2 rounded-md bg-orange-600 text-white font-medium 
                       hover:bg-orange-700 transition-all"
          >
            Create a Plan
          </Link>
        </div>
      )}

      
      {plans.length > 0 && (
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
    
  );
}
