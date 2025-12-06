/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITravelPlan {
  updatedAt: string;
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
  host?: {
    id: string;
    email: string;
    fullName?: string | null;
    profileImage?: string | null;
  };
}
export type TravelPlanProps = {
  plans: ITravelPlan[];
  loading: boolean;
  error: string | null;
  actionLoadingId: string | null;
  onView: (plan: ITravelPlan) => void;
  onEdit: (plan: ITravelPlan) => void;
  onDelete: (plan: ITravelPlan) => void;
};