"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiEdit2, FiCheck, FiLoader, FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function MyProfilePage() {
  const router = useRouter();
  
  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // States
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

 
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Name Update Handler
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name === user?.name) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
     
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) throw new Error(error.message || "Failed to update name.");

      setMessage({ type: "success", text: "Profile name updated successfully!" });
      setIsEditing(false);
      
    
      router.refresh();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong." });
      setName(user?.name || ""); 
    } finally {
      setLoading(false);
    }
  };

 
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
        <FiLoader className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

 
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <FiAlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6">Please log in to manage your profile settings.</p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-amber-500 hover:bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Back to Dashboard Link */}
        <button 
          onClick={() => router.push("/My-Interaction")} 
          className="flex items-center gap-1.5 text-slate-500 font-bold mb-4 hover:text-slate-900 transition-colors text-sm"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Avatar Header Decor */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white text-3xl font-extrabold mb-3 shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Profile Settings</h2>
            <p className="text-slate-500 text-xs mt-0.5">Manage your account identity details</p>
          </div>

          {/* Status Feedback */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Info & Form Fields */}
          <div className="space-y-5">
            {/* Email Field (Read Only) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wide">Email Address</label>
              <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 text-slate-600 cursor-not-allowed">
                <FiMail className="text-slate-400" size={18} />
                <span className="text-sm">{user.email}</span>
                <span className="ml-auto text-[10px] font-bold uppercase bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Locked</span>
              </div>
            </div>

            {/* Name Field (Editable) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">Full Name</label>
              {isEditing ? (
                <form onSubmit={handleUpdateName} className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <FiUser size={18} />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={user.name || ""}
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      autoFocus
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-500 hover:bg-orange-500 text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center aspect-square disabled:opacity-50"
                  >
                    {loading ? <FiLoader className="animate-spin" /> : <FiCheck size={18} />}
                  </button>
                </form>
              ) : (
                <div className="relative border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-slate-900 bg-white group">
                  <div className="flex items-center gap-3">
                    <FiUser className="text-slate-400" size={18} />
                    <span className="text-sm font-semibold">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setName(user.name || "");
                      setIsEditing(true);
                    }}
                    className="text-green-700 hover:text-green-800 text-xs font-bold flex items-center gap-1 transition-colors border border-green-700/20 px-2.5 py-1 rounded-lg hover:bg-green-50"
                  >
                    <FiEdit2 size={12} /> Change
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}