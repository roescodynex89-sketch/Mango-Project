"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  FiShoppingBag,
  FiMessageSquare,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

interface Mango {
  _id: string;
  title: string;
  variety: string;
  price: number;
  image: string;
  userId: string;
}

interface Comment {
  _id: string;
  mangoId: string;
  text: string;
  createdAt: string;
  userId: string;
}

export default function MyInteractionPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState<"mangoes" | "comments">("mangoes");
  const [myMangoes, setMyMangoes] = useState<Mango[]>([]);
  const [myComments, setMyComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Edit Modals State
  const [editingMango, setEditingMango] = useState<Mango | null>(null);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editText, setEditText] = useState("");

  // Fetch Logic (JWT Bearer Token Added)
  useEffect(() => {
    if (!user) return;

    const fetchMyData = async () => {
      setLoading(true);
      try {
        const tokenRes = await (authClient as any).token();
        const token = tokenRes?.data?.token;

        const mangoRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/mangoes?limit=100`,
        );
        const mangoData = await mangoRes.json();
        const filteredMangoes = (mangoData.data || []).filter(
          (m: Mango) => m.userId === user.id,
        );
        setMyMangoes(filteredMangoes);

        const commentRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/my-comments/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (commentRes.ok) {
          const commentData = await commentRes.json();
          setMyComments(commentData.data || []);
        }
      } catch (err) {
        console.error("Error fetching interactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, [user]);

  // Delete Mango (JWT Bearer Token Added)
  const handleDeleteMango = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mango stock?")) return;

    try {
      const tokenRes = await (authClient as any).token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mangoes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        setMyMangoes((prev) => prev.filter((m) => m._id !== id));
        showStatus("success", "Mango deleted successfully!");
      } else {
        showStatus("error", "Failed to delete mango.");
      }
    } catch (err) {
      showStatus("error", "Failed to delete mango.");
    }
  };

  // Edit Mango Submit (JWT Bearer Token Added)
  const handleUpdateMango = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMango) return;

    try {
      const tokenRes = await (authClient as any).token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mangoes/${editingMango._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingMango),
        },
      );

      if (res.ok) {
        setMyMangoes((prev) =>
          prev.map((m) => (m._id === editingMango._id ? editingMango : m)),
        );
        setEditingMango(null);
        showStatus("success", "Mango updated successfully!");
      } else {
        showStatus("error", "Failed to update mango.");
      }
    } catch (err) {
      showStatus("error", "Failed to update mango.");
    }
  };

  // Delete Comment (JWT Bearer Token Added)
  const handleDeleteComment = async (id: string) => {
    if (!confirm("Delete this comment?")) return;

    try {
      const tokenRes = await (authClient as any).token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user?.id }),
        },
      );
      if (res.ok) {
        setMyComments((prev) => prev.filter((c) => c._id !== id));
        showStatus("success", "Comment deleted!");
      } else {
        showStatus("error", "Failed to delete comment.");
      }
    } catch (err) {
      showStatus("error", "Failed to delete comment.");
    }
  };

  // Edit Comment Submit (JWT Bearer Token Added)
  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComment || !editText.trim()) return;

    try {
      const tokenRes = await (authClient as any).token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${editingComment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: editText, userId: user?.id }),
        },
      );

      if (res.ok) {
        setMyComments((prev) =>
          prev.map((c) =>
            c._id === editingComment._id ? { ...c, text: editText } : c,
          ),
        );
        setEditingComment(null);
        showStatus("success", "Comment updated!");
      } else {
        showStatus("error", "Failed to update comment.");
      }
    } catch (err) {
      showStatus("error", "Failed to update comment.");
    }
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  if (sessionLoading || loading) {
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600 mb-6">
            Please log in to manage your interactions.
          </p>
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
    <div className="min-h-[calc(100vh-4rem)] bg-amber-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            My Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage all your listed mango stocks and discussions.
          </p>
        </div>

        {/* Global Alert */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl border font-medium text-sm flex items-center gap-2 ${statusMessage.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`}
          >
            {statusMessage.type === "success" ? (
              <FiCheckCircle />
            ) : (
              <FiAlertCircle />
            )}
            {statusMessage.text}
          </div>
        )}

        {/* Tabs Control */}
        <div className="flex border-b border-slate-200 mb-6 bg-white p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab("mangoes")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === "mangoes" ? "bg-green-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <FiShoppingBag /> My Added Mangoes ({myMangoes.length})
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === "comments" ? "bg-green-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <FiMessageSquare /> My Comments ({myComments.length})
          </button>
        </div>

        {/* Content Section */}
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "mangoes" ? (
              <motion.div
                key="mangoes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {myMangoes.length === 0 ? (
                  <p className="text-center text-slate-500 py-10 bg-white border border-slate-200 rounded-2xl">
                    You haven't listed any mangoes yet.
                  </p>
                ) : (
                  myMangoes.map((mango) => (
                    <div
                      key={mango._id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Image
                          src={mango.image}
                          alt={mango.title}
                          className="w-16 h-16 object-cover rounded-xl bg-slate-100 shrink-0"
                          width={50}
                          height={50}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">
                            {mango.title}
                          </h4>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                            {mango.variety}
                          </span>
                          <p className="text-sm font-extrabold text-slate-900 mt-1">
                            ${mango.price}/KG
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => setEditingMango(mango)}
                          className="p-2 text-sm font-semibold border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMango(mango._id)}
                          className="p-2 text-sm font-semibold bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key="comments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {myComments.length === 0 ? (
                  <p className="text-center text-slate-500 py-10 bg-white border border-slate-200 rounded-2xl">
                    You haven't commented on any posts yet.
                  </p>
                ) : (
                  myComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          "{comment.text}"
                        </p>
                        <span className="text-xs text-slate-400 mt-2 block">
                          Posted on:{" "}
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 border-t border-slate-100 pt-2">
                        <button
                          onClick={() => {
                            setEditingComment(comment);
                            setEditText(comment.text);
                          }}
                          className="text-xs font-bold text-slate-600 flex items-center gap-1 hover:text-slate-900"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-xs font-bold text-red-600 flex items-center gap-1 hover:text-red-700"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- MANGO EDIT MODAL --- */}
        {editingMango && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setEditingMango(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <FiX size={20} />
              </button>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Edit Mango Stock
              </h3>
              <form onSubmit={handleUpdateMango} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingMango.title}
                    onChange={(e) =>
                      setEditingMango({
                        ...editingMango,
                        title: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Price ($/KG)
                  </label>
                  <input
                    type="number"
                    value={editingMango.price}
                    onChange={(e) =>
                      setEditingMango({
                        ...editingMango,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingMango(null)}
                    className="px-4 py-2 text-sm font-medium bg-slate-100 rounded-xl text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-orange-500 text-white rounded-xl shadow"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* --- COMMENT EDIT MODAL --- */}
        {editingComment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setEditingComment(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <FiX size={20} />
              </button>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Edit Comment
              </h3>
              <form onSubmit={handleUpdateComment} className="space-y-4">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 outline-none focus:border-amber-500 resize-none"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingComment(null)}
                    className="px-4 py-2 text-sm font-medium bg-slate-100 rounded-xl text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-orange-500 text-white rounded-xl shadow"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
