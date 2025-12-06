import React from "react";
import Image from "next/image";

import UserCard from "./UserCard";
import ActionButtons from "./ActionButtons";
import { IUser } from "@/types/user.interface";

type Props = {
  users: IUser[];
  loading: boolean;
  error: string | null;
  actionLoading: string | null;
  onDelete: (userId: string, userName?: string) => void;
  onChangeRole: (userId: string, currentRole: string, userName?: string) => void;
};

export default function UsersTable({ users, loading, error, onDelete, onChangeRole, actionLoading }: Props) {
  const formatDate = (iso?: string | null) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso ?? "-";
    }
  };

  if (loading) return <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">Loading users...</div>;
  if (error) return <div className="rounded-lg border border-red-200 p-6 text-center text-red-600">{error}</div>;
  if (!users.length) return <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">No users found</div>;

  return (
    <>
      {/* desktop table */}
      <div className="hidden md:block rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Premium</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t last:border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    {user.profileImage ? (
                      <Image src={user.profileImage} alt={user.fullName ?? user.email} width={48} height={48} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" /></svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{user.fullName ?? "No name"}</div>
                    <div className="text-xs text-gray-500">{user.bio ?? "-"}</div>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.currentLocation ?? "-"}</td>

                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${user.role === "ADMIN" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700"}`}>
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{user.isPremium ? `Yes (${formatDate(user.premiumExpiresAt)})` : <span className="text-sm text-gray-500">No</span>}</td>

                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(user.createdAt)}</td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <ActionButtons
                      userId={user.id}
                      userName={user.fullName ?? user.email}
                      role={user.role}
                      actionLoading={actionLoading}
                      onDelete={onDelete}
                      onChangeRole={onChangeRole}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="md:hidden space-y-3">
        {users.map(u => (
          <UserCard key={u.id} user={u} actionLoading={actionLoading} onDelete={onDelete} onChangeRole={onChangeRole} />
        ))}
      </div>
    </>
  );
}
