

// import PlanCard from "@/components/modules/plan/PlanCard";

// import { API_BASE } from "@/lib/baseApi";
// import LoaderWrapper from "@/lib/LoaderWrapper";
// import { ITravelPlan } from "@/types/travelPlan.interface";
// import Link from "next/link";

// export default async function PlansPage() {
//   const res = await fetch(
//     `${API_BASE}/api/travel-plans`,
//     {cache: "no-store",}
//   );
//   const json = await res.json();

//   const plans: ITravelPlan[] = json.plans || [];

//   return (
   
// <LoaderWrapper>
//         <div className="min-h-screen px-4 md:px-8 py-6">

      
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">All Travel Plans</h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Explore your saved trips and upcoming adventures.
//           </p>
//         </div>

//         <Link
//           href="/travel-plans/add"
//           className="px-2 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2  text-sm md:text-base lg:text-base rounded-md bg-linear-to-r from-orange-500 to-orange-600 
//                      text-white font-medium hover:from-orange-600 hover:to-orange-700 
//                      transition"
//         >
//           + Add Plan
//         </Link>
//       </div>

     
//       {plans.length === 0 && (
//         <div className="mt-16 flex flex-col items-center text-center">
//           <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200">
//             <svg xmlns="http://www.w3.org/2000/svg" 
//                  className="h-8 w-8 text-orange-500"
//                  viewBox="0 0 24 24"
//                  fill="none"
//                  stroke="currentColor">
//               <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 10c0 5 4 9 9 9s9-4 9-9"/>
//               <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 3v7"/>
//             </svg>
//           </div>

//           <h3 className="mt-4 text-xl font-semibold text-gray-800">
//             No travel plans yet
//           </h3>
//           <p className="text-gray-500 text-sm mt-1 max-w-sm">
//             Start planning your next adventure by adding your first trip.
//           </p>

//           <Link
//             href="/travel-plans/add"
//             className="mt-4 px-5 py-2 rounded-md bg-orange-600 text-white font-medium 
//                        hover:bg-orange-700 transition-all"
//           >
//             Create a Plan
//           </Link>
//         </div>
//       )}

      
//       {plans.length > 0 && (
//         <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {plans.map(plan => (
//             <PlanCard key={plan.id} plan={plan} />
//           ))}
//         </div>
//       )}
//     </div>
//     </LoaderWrapper>
//   );
// }
import PlanCard from "@/components/modules/plan/PlanCard";
import { API_BASE } from "@/lib/baseApi";
import LoaderWrapper from "@/lib/LoaderWrapper";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    destination?: string;
    travelType?: string;
  }>;
};

export default async function PlansPage({ searchParams }: PageProps) {
  // ✅ IMPORTANT FIX
  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 9;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(params.destination && { destination: params.destination }),
    ...(params.travelType && { travelType: params.travelType }),
  });

  const res = await fetch(
    `${API_BASE}/api/travel-plans?${query.toString()}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  const plans: ITravelPlan[] = json.data || [];
  const meta = json.meta;

  return (
    <LoaderWrapper>
      <div className="container mx-auto min-h-screen px-4 md:px-8 py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              All Travel Plans
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Explore your saved trips and upcoming adventures.
            </p>
          </div>

          <Link
  href="/travel-plans/add"
  className="
    inline-flex items-center justify-center gap-2
    px-4 py-2 sm:px-5 sm:py-2.5
    rounded-lg
    bg-orange-500 text-white
    font-medium text-sm sm:text-base
    
    transition-all duration-200
    hover:bg-orange-600 hover:shadow-lg
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
  "
>
  <span className="text-lg leading-none">＋</span>
  <span className="whitespace-nowrap">Add Plan</span>
</Link>

        </div>

        {/* FILTER */}
        

        {/* LIST */}
        {plans.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No travel plans found.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* PAGINATION */}
        {meta?.totalPages > 1 && (
  <div className="flex items-center justify-center gap-4 mt-10">
    
    {/* Previous Button */}
    <Link
      href={`?page=${page - 1}`}
      aria-disabled={page === 1}
      className={`px-4 py-2 rounded-lg border font-medium transition
        ${
          page === 1
            ? "pointer-events-none bg-gray-100 text-gray-400 border-gray-200"
            : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
        }
      `}
    >
      ← Previous
    </Link>

    {/* Page Info */}
    <span className="text-sm font-medium text-gray-600">
      Page <span className="font-semibold">{meta.page}</span> of{" "}
      <span className="font-semibold">{meta.totalPages}</span>
    </span>

    {/* Next Button */}
    <Link
      href={`?page=${page + 1}`}
      aria-disabled={page === meta.totalPages}
      className={`px-4 py-2 rounded-lg border font-medium transition
        ${
          page === meta.totalPages
            ? "pointer-events-none bg-gray-100 text-gray-400 border-gray-200"
            : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
        }
      `}
    >
      Next →
    </Link>
  </div>
)}

      </div>
    </LoaderWrapper>
  );
}

