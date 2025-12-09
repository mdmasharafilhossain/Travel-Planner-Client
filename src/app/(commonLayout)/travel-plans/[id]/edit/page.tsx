/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function EditPlanPage() {
  const router = useRouter();
  const params = useParams();

  // ✅ NEXT.JS 16 SAFE
  const planId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    travelType: "SOLO",
    visibility: "PUBLIC",
  });

  useEffect(() => {
    loadPlan();
  }, []);

  async function loadPlan() {
    try {
      const res = await fetch(`${API_BASE}/api/travel-plans/${planId}`, {
        credentials: "include",
      });
      const json = await res.json();

      if (!json.success) {
        Swal.fire("Error", json.message, "error");
        return;
      }

      const p = json.plan;

      setForm({
        title: p.title || "",
        destination: p.destination,
        startDate: p.startDate.split("T")[0],
        endDate: p.endDate.split("T")[0],
        description: p.description || "",
        budgetMin: p.budgetMin || "",
        budgetMax: p.budgetMax || "",
        travelType: p.travelType,
        visibility: p.visibility,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: any) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/travel-plans/user/update/${planId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!json.success) {
        Swal.fire("Update Failed", json.message, "error");
        return;
      }

      Swal.fire("Updated!", "Travel plan updated successfully.", "success");
      router.push(`/travel-plans/${planId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">Edit Travel Plan</h1>

      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="text-sm">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm">Destination</label>
          <input
            type="text"
            value={form.destination}
            onChange={(e) => updateField("destination", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              className="w-full px-2 py-2 border rounded"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm">End Date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
              className="w-full px-2 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="text-sm">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full px-2 py-2 border rounded"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min Budget"
            value={form.budgetMin}
            onChange={(e) => updateField("budgetMin", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          />

          <input
            type="number"
            placeholder="Max Budget"
            value={form.budgetMax}
            onChange={(e) => updateField("budgetMax", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm">Travel Type</label>
          <select
            value={form.travelType}
            onChange={(e) => updateField("travelType", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          >
            <option value="SOLO">Solo</option>
            <option value="FAMILY">Family</option>
            <option value="FRIENDS">Friends</option>
            <option value="COUPLE">Couple</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Visibility</label>
          <select
            value={form.visibility}
            onChange={(e) => updateField("visibility", e.target.value)}
            className="w-full px-2 py-2 border rounded"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
