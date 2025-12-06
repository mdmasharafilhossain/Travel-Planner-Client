export type Props = {
  userId: string;
  userName?: string;
  role: string;
  actionLoading: string | null;
  onDelete: (id: string, name?: string) => void;
  onChangeRole: (id: string, currentRole: string, name?: string) => void;
};
