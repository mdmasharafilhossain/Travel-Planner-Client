/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PlansAPI } from "@/lib/api";
import { ITravelPlan } from "@/types/travelPlan.interface";
import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

import PlanTable from "./PlanTable";
import PlanFormAdmin from "./PlanFormAdmin";
import Loader from "@/components/shared/Loader";

export default function PlanManagementPage() {
  const [plans, setPlans] = useState<ITravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<ITravelPlan | null>(null);

 
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState<any>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await PlansAPI.list({ page, limit });

    
      const data = res.data?.data ?? res.data?.plans ?? [];
      const metaInfo = res.data?.meta ?? null;

      setPlans(Array.isArray(data) ? data : []);
      setMeta(metaInfo);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message || err?.message || "Failed to load plans"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleDelete = useCallback(
    async (plan: ITravelPlan) => {
      const result = await Swal.fire({
        title: "Delete plan?",
        text: `Are you sure you want to delete "${plan.title || plan.destination}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#fb923c",
      });

      if (!result.isConfirmed) return;

      try {
        setActionLoadingId(plan.id);

        setPlans(prev => prev.filter(p => p.id !== plan.id));
        const res = await PlansAPI.remove(plan.id);

        await Swal.fire({
          icon: "success",
          title: "Deleted",
          text: res.data?.message || "Plan deleted successfully",
          confirmButtonColor: "#fb923c",
        });
      } catch (err: any) {
        console.error(err);
        await Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            err?.response?.data?.message ||
            err?.message ||
            "Failed to delete plan",
          confirmButtonColor: "#fb923c",
        });
        fetchPlans();
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchPlans]
  );

  const handleViewDetails = useCallback(async (plan: ITravelPlan) => {
    const formatDate = (iso: string) =>
      new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    const html = `
      <div class="text-left text-sm text-gray-700">
        <p><strong>Title:</strong> ${plan.title || "-"}</p>
        <p><strong>Destination:</strong> ${plan.destination}</p>
        <p><strong>Travel Type:</strong> ${plan.travelType}</p>
        <p><strong>Visibility:</strong> ${plan.visibility}</p>
        <p><strong>Dates:</strong> ${formatDate(
          plan.startDate
        )} - ${formatDate(plan.endDate)}</p>
        <p><strong>Budget:</strong> ${
          plan.budgetMin != null ? plan.budgetMin : "-"
        } - ${plan.budgetMax != null ? plan.budgetMax : "-"}</p>
        <p><strong>Host:</strong> ${plan.host?.fullName || "-"} (${
      plan.host?.email || "-"
    })</p>
        <p class="mt-2"><strong>Description:</strong></p>
        <p>${plan.description || "-"}</p>
      </div>
    `;

    await Swal.fire({
      title: "Plan Details",
      html,
      width: 600,
      confirmButtonColor: "#fb923c",
    });
  }, []);

  const handleEditClick = useCallback((plan: ITravelPlan) => {
    setEditingPlan(plan);
  }, []);

  const handleUpdateSaved = (updated: ITravelPlan) => {
    setPlans(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    setEditingPlan(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Plan Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage all travel plans — view details, edit, or delete.
            </p>
          </div>
          <button
            onClick={fetchPlans}
            className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-2 rounded-md text-sm shadow"
          >
            Refresh
          </button>
        </header>

        {editingPlan && (
          <div className="mb-6">
            <PlanFormAdmin
              plan={editingPlan}
              onCancel={() => setEditingPlan(null)}
              onSaved={handleUpdateSaved}
            />
          </div>
        )}

        <PlanTable
          plans={plans}
          loading={loading}
          error={error}
          actionLoadingId={actionLoadingId}
          onView={handleViewDetails}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        {/* ✅ PAGINATION UI */}
        {meta?.totalPages > 1 && (
  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">

    {/* Previous */}
    <button
      disabled={page <= 1}
      onClick={() => setPage(p => p - 1)}
      className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-lg
        border font-medium text-sm
        transition-all duration-200
        ${
          page <= 1
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 active:scale-95"
        }
      `}
    >
      ← Previous
    </button>

    {/* Page Info */}
    <span className="text-sm font-medium text-gray-600">
      Page <span className="font-semibold">{meta.page}</span> of{" "}
      <span className="font-semibold">{meta.totalPages}</span>
    </span>

    {/* Next */}
    <button
      disabled={page >= meta.totalPages}
      onClick={() => setPage(p => p + 1)}
      className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-lg
        border font-medium text-sm
        transition-all duration-200
        ${
          page >= meta.totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 active:scale-95"
        }
      `}
    >
      Next →
    </button>

  </div>
)}

      </div>
    </div>
  );
}

