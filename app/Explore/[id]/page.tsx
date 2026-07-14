"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiSend,
  FiLoader,
  FiArrowLeft,
} from "react-icons/fi";
import Image from "next/image";
interface Comment {
  _id: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface MangoDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  variety: string;
  image: string;
  userName?: string;
}

export default function MangoDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mango, setMango] = useState<MangoDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // Better Auth Session info
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`
          ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mangoes/${id}`);
        if (!res.ok) throw new Error("Mango details not found.");
        const result = await res.json();
        setMango(result.mango);
        setComments(result.interactions.comments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setCommentSubmitting(true);
    try {
      const tokenRes = await (authClient as any).token();
      const token = tokenRes?.data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            mangoId: id,
            userId: user.id,
            userName: user.name,
            text: newComment,
          }),
        },
      );

      if (res.ok) {
        const result = await res.json();

        setComments((prev) => [result.comment, ...prev]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
        <FiLoader className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

  if (!mango) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold text-slate-900">Details not found</h3>
        <button
          onClick={() => router.push("/Explore")}
          className="mt-4 bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/Explore")}
          className="flex items-center gap-1.5 text-slate-600 font-bold mb-6 hover:text-slate-900 transition-colors"
        >
          <FiArrowLeft /> Back to Explore
        </button>

        {/* Main Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="h-96 w-full bg-slate-100 relative">
            <Image
              src={mango.image}
              alt={mango.title}
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <span className="absolute bottom-4 left-4 bg-green-700 text-white font-bold text-sm px-4 py-1.5 rounded-full">
              {mango.variety}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {mango.title}
              </h1>
              <div className="text-2xl font-black text-slate-900 flex items-center self-start sm:self-center">
                <FiDollarSign className="text-amber-500" />
                {mango.price}
                <span className="text-sm font-normal text-slate-500">/KG</span>
              </div>
            </div>

            {/* Author Meta */}
            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm my-4">
              <span className="flex items-center gap-1.5">
                <FiUser className="text-amber-500" /> Added by:{" "}
                <strong className="text-slate-900">
                  {mango.userName || "Orchard Owner"}
                </strong>
              </span>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Full Description
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {mango.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <div className="mt-10 bg-white border border-slate-200 rounded-3xl shadow-md p-6 sm:p-8">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-6">
            <FiMessageSquare className="text-amber-500" /> Interactions (
            {comments.length})
          </h3>

          {/* Post Comment Input */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="relative border border-slate-300 rounded-2xl focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all p-2 bg-white flex items-center">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question or share feedback..."
                  className="w-full px-3 py-2 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={commentSubmitting || !newComment.trim()}
                  className="bg-amber-500 hover:bg-orange-500 text-white p-2.5 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {commentSubmitting ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <FiSend />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center mb-8">
              <p className="text-sm text-slate-600">
                Please{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="text-green-700 font-bold hover:underline cursor-pointer"
                >
                  Login
                </span>{" "}
                to join the interaction and add comments.
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                No interactions yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <FiCalendar />{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
