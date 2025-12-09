// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { PlansAPI } from "@/lib/api";
// import { ITravelPlan } from "@/types/travelPlan.interface";
// import React, { useEffect, useState, useCallback } from "react";
// import Swal from "sweetalert2";
// import PlanForm from "../../plan/PlanForm";
// import PlanTable from "./PlanTable";
// import PlanFormAdmin from "./PlanFormAdmin";


// export default function PlanManagementPage() {
//   const [plans, setPlans] = useState<ITravelPlan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

//   const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);

//   const fetchPlans = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await PlansAPI.list();
//       const data = res.data?.plans ?? res.data;
//       setPlans(Array.isArray(data) ? data : []);
//     } catch (err: any) {
//       console.error(err);
//       setError(
//         err?.response?.data?.message || err?.message || "Failed to load plans"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPlans();
//   }, [fetchPlans]);

//   const handleDelete = useCallback(
//     async (plan: ITravelPlan) => {
//       const result = await Swal.fire({
//         title: "Delete plan?",
//         text: `Are you sure you want to delete "${plan.title || plan.destination}"?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#fb923c",
//       });

//       if (!result.isConfirmed) return;

//       try {
//         setActionLoadingId(plan.id);
//         // optimistic update
//         setPlans(prev => prev.filter(p => p.id !== plan.id));
//         const res = await PlansAPI.remove(plan.id);

//         await Swal.fire({
//           icon: "success",
//           title: "Deleted",
//           text: res.data?.message || "Plan deleted successfully",
//           confirmButtonColor: "#fb923c",
//         });
//       } catch (err: any) {
//         console.error(err);
//         await Swal.fire({
//           icon: "error",
//           title: "Failed",
//           text:
//             err?.response?.data?.message ||
//             err?.message ||
//             "Failed to delete plan",
//           confirmButtonColor: "#fb923c",
//         });
//         fetchPlans(); // rollback via re-fetch
//       } finally {
//         setActionLoadingId(null);
//       }
//     },
//     [fetchPlans]
//   );

//   const handleViewDetails = useCallback(async (plan: ITravelPlan) => {
//     const formatDate = (iso: string) =>
//       new Date(iso).toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });

//     const html = `
//       <div class="text-left text-sm text-gray-700">
//         <p><strong>Title:</strong> ${plan.title || "-"}</p>
//         <p><strong>Destination:</strong> ${plan.destination}</p>
//         <p><strong>Travel Type:</strong> ${plan.travelType}</p>
//         <p><strong>Visibility:</strong> ${plan.visibility}</p>
//         <p><strong>Dates:</strong> ${formatDate(
//           plan.startDate
//         )} - ${formatDate(plan.endDate)}</p>
//         <p><strong>Budget:</strong> ${
//           plan.budgetMin != null ? plan.budgetMin : "-"
//         } - ${plan.budgetMax != null ? plan.budgetMax : "-"}</p>
//         <p><strong>Host:</strong> ${plan.host?.fullName || "-"} (${
//       plan.host?.email || "-"
//     })</p>
//         <p class="mt-2"><strong>Description:</strong></p>
//         <p>${plan.description || "-"}</p>
//       </div>
//     `;

//     await Swal.fire({
//       title: "Plan Details",
//       html,
//       width: 600,
//       confirmButtonColor: "#fb923c",
//     });
//   }, []);

//   const handleEditClick = useCallback((plan: ITravelPlan) => {
//     setEditingPlan(plan);
//   }, []);

//   const handleUpdateSaved = (updated: ITravelPlan) => {
//     setPlans(prev => prev.map(p => (p.id === updated.id ? updated : p)));
//     setEditingPlan(null);
   

//   };

//   return (
//     <div className="p-4 md:p-8">
//       <div className="max-w-[1200px] mx-auto">
//         <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Plan Management
//             </h1>
//             <p className="text-sm text-gray-500">
//               Manage all travel plans — view details, edit, or delete.
//             </p>
//           </div>
//           <button
//             onClick={fetchPlans}
//             className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded-md text-sm shadow"
//           >
//             Refresh
//           </button>
//         </header>

//         {/* Edit form card (only when editing) */}
//         {editingPlan && (
//           <div className="mb-6">
//             <PlanFormAdmin
//               plan={editingPlan}
//               onCancel={() => setEditingPlan(null)}
//               onSaved={handleUpdateSaved}
//             />
//           </div>
//         )}

//         <PlanTable
//           plans={plans}
//           loading={loading}
//           error={error}
//           actionLoadingId={actionLoadingId}
//           onView={handleViewDetails}
//           onEdit={handleEditClick}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// }
