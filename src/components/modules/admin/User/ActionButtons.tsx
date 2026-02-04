import { Props } from "@/types";

export default function ActionButtons({
  userId,
  userName,
  role,
  actionLoading,
  onDelete,
  onChangeRole,
}: Props) {
  const busy = actionLoading === userId;

  return (
    <>
    
      <button
        onClick={() => onChangeRole(userId, role, userName)}
        disabled={busy}
        className="
          px-3 py-1 rounded-md text-sm
          border border-gray-200 dark:border-gray-600
          text-gray-700 dark:text-gray-200
          hover:bg-gray-50 dark:hover:bg-gray-700
          transition
        "
        title="Change Role"
      >
        {busy ? "..." : role === "ADMIN" ? "Demote" : "Promote"}
      </button>

   
      <button
        onClick={() => onDelete(userId, userName)}
        disabled={busy}
        className="
          px-3 py-1 rounded-md text-sm
          bg-red-50 dark:bg-red-900/30
          text-red-600 dark:text-red-400
          border border-red-100 dark:border-red-700
          hover:bg-red-100 dark:hover:bg-red-900/50
          transition
        "
        title="Delete user"
      >
        {busy ? "..." : "Delete"}
      </button>
    </>
  );
}
