
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";


export default function PlanCard({ plan }: { plan: ITravelPlan }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{plan.title || plan.destination}</h3>
      <p className="text-sm text-gray-600">{plan.description}</p>
      <div className="mt-2 text-xs text-gray-500">{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</div>
      <div className="mt-3">
        <Link href={`/travel-plans/${plan.id}`}>view details</Link>
      </div>
    </div>
  );
}
