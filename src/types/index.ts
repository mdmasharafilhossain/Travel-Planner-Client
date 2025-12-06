import { IUser } from "./user.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Props = {
  userId: string;
  userName?: string;
  role: any;
  actionLoading: string | null;
  onDelete: (id: string, name?: string) => void;
  onChangeRole: (id: string, currentRole: string, name?: string) => void;
};
export type UserCardsProps = {
  user: IUser;
  actionLoading: string | null;
  onDelete: (id: string, name?: string) => void;
  onChangeRole: (id: string, role: string, name?: string) => void;
};