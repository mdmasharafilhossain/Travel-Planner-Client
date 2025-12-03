export interface ITravelPlan {
  id: string;
  title?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  travelType?: string;
  description?: string;
  visibility?: string;
  hostId?: string;
  createdAt?: string;
}