import Image from "next/image";
import UserCard from "./UserCard";
import ActionButtons from "./ActionButtons";
import { UsersTableProps } from "@/types";

export default function UsersTable({
  users,
  loading,
  error,
  onDelete,
  onChangeRole,
  actionLoading,
}: UsersTableProps) {
  const formatDate = (iso?: string | null) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso ?? "-";
    }
  };

  if (loading)
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center text-gray-500 dark:text-gray-400 shadow">
        Loading users…
      </div>
    );

  if (error)
    return (
      <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-8 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );

  if (!users.length)
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center text-gray-500 dark:text-gray-400 shadow">
        No users found
      </div>
    );

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow">
        <table className="min-w-full text-sm">

          <thead className="bg-orange-300 dark:bg-orange-600/30 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-200">
            <tr>
              <th className="px-5 py-4 text-left">User</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Location</th>
              <th className="px-5 py-4 text-left">Role</th>
              <th className="px-5 py-4 text-left">Premium</th>
              <th className="px-5 py-4 text-left">Created</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-orange-50/40 dark:hover:bg-gray-700/40"
              >
                {/* User */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <div className="relative h-11 w-11 overflow-hidden rounded-full border bg-gray-100 dark:bg-gray-700 shrink-0">
                      {user.profileImage ? (
                        <Image
                          src={
                            user?.profileImage ||
                            "https://i.ibb.co.com/jvLMWbX0/image.png"
                          }
                          alt={user.fullName ?? user.email}
                          width={44}
                          height={44}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400 dark:text-gray-500">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-100">
                        {user.fullName ?? "No name"}
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {user.bio ?? "-"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>

                {/* Location */}
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                  {user.currentLocation ?? "-"}
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Premium */}
                <td className="px-5 py-4">
                  {user.isPremium ? (
                    <div className="text-gray-700 dark:text-gray-300">
                      <div className="font-medium">Yes</div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Expires: {formatDate(user.premiumExpiresAt)}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      No
                    </span>
                  )}
                </td>

                {/* Created */}
                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {formatDate(user.createdAt)}
                </td>

                {/* Actions */}
                <td className="py-4 flex gap-1 text-right">
                  <ActionButtons
                    userId={user.id}
                    userName={user.fullName ?? user.email}
                    role={user.role}
                    actionLoading={actionLoading}
                    onDelete={onDelete}
                    onChangeRole={onChangeRole}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            actionLoading={actionLoading}
            onDelete={onDelete}
            onChangeRole={onChangeRole}
          />
        ))}
      </div>
    </>
  );
}
