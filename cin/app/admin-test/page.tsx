"use client";

import { useAdminSession } from "@/context/AdminSessionContext";

export default function AdminTestPage() {
  const { isAdminAuthed, loginAsAdmin, logoutAdmin } = useAdminSession();

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Admin Session Test</h1>
      <div className="mb-4 p-4 border rounded bg-slate-50">
        <p className="text-lg">
          Admin Authenticated: <span className={`font-mono font-bold ${isAdminAuthed ? "text-green-600" : "text-red-600"}`}>{isAdminAuthed ? "YES" : "NO"}</span>
        </p>
      </div>
      <div className="flex gap-4">
        {!isAdminAuthed ? (
          <button
            onClick={loginAsAdmin}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Login as Admin
          </button>
        ) : (
          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout Admin
          </button>
        )}
      </div>
      <p className="mt-8 text-sm text-slate-500">
        Try logging in and refreshing the page. The status should persist.
      </p>
    </div>
  );
}
