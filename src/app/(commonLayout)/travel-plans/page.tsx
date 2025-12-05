// app/travel-plans/page.tsx

import PlanCard from "@/components/modules/plan/PlanCard";
import { ITravelPlan } from "@/types/travelPlan.interface";
import Link from "next/link";


export default async function PlansPage() {
  // ISR: fetch on server with revalidate
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000"}/api/travel-plans`, { next: { revalidate: 30 }});
  const json = await res.json();

  const plans: ITravelPlan[] = json.plans || [];
   
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Travel Plans</h2>
        <Link href="/travel-plans/add">Add Plan</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map(p => <PlanCard key={p.id} plan={p} />)}
      </div>
    </div>
  );
}
