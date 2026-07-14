"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  FiPlusCircle,
  FiFileText,
  FiDollarSign,
  FiImage,
  FiTag,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";

// Form Input Types
interface MangoFormInputs {
  title: string;
  description: string;
  price: number;
  variety: string;
  image: string;
}

export default function AddMangoesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MangoFormInputs>();

  //
  console.log("full", session);

  const onSubmit = async (data: MangoFormInputs) => {
    if (!user) {
      setMessage({
        type: "error",
        text: "You must be logged in to add mangoes.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const tokenRes = await (authClient as any).token();

      const token = tokenRes?.data?.token;

      if (!token || typeof token !== "string") {
        throw new Error("JWT Token could not be read properly. Check console.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mangoes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...data,
            userId: user.id,
            userName: user.name,
          }),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to add mango.");
      }

      setMessage({ type: "success", text: "Mango added successfully!" });
      reset();

      setTimeout(() => {
        router.push("/Explore");
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong.",
      });
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600 mb-6">
            Please log in to your account to add fresh mangoes to MangoCart.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-amber-500 hover:bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            Go to Login <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-6">
          <FiPlusCircle className="text-amber-500" size={28} />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Add New Mango Stock
            </h2>
            <p className="text-sm text-slate-600">
              Fill up the form below to list fresh mangoes.
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border font-medium text-sm transition-all ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Mango Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">
                Mango Title
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <FiTag size={18} />
                </span>
                <input
                  {...register("title", {
                    required: "Mango title is required",
                  })}
                  type="text"
                  placeholder="e.g., Premium Rajshahi Himsagar"
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                />
              </div>
              {errors.title && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">
                Price (per KG)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <FiDollarSign size={18} />
                </span>
                <input
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    validate: (value) =>
                      value > 0 || "Price must be greater than 0",
                  })}
                  type="number"
                  placeholder="150"
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                />
              </div>
              {errors.price && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Variety */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">
                Mango Variety
              </label>
              <div className="relative">
                <select
                  {...register("variety", {
                    required: "Please select a variety",
                  })}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                >
                  <option value="">Select Variety</option>
                  <option value="Gopalbhog">Gopalbhog</option>
                  <option value="Langra">Langra</option>
                  <option value="Himsagar">Himsagar</option>
                  <option value="Fazli">Fazli</option>
                </select>
              </div>
              {errors.variety && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.variety.message}
                </p>
              )}
            </div>

            {/* Unsplash Image Link */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">
                Image Link (Unsplash)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <FiImage size={18} />
                </span>
                <input
                  {...register("image", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Please enter a valid URL",
                    },
                  })}
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                />
              </div>
              {errors.image && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 tracking-wide">
                Short Description
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-start pl-3.5 pt-3 text-slate-500">
                  <FiFileText size={18} />
                </span>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  placeholder="Write a short detail about the mangoes (freshness, location, etc.)..."
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 resize-none"
                />
              </div>
              {errors.description && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-4 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={() => router.push("/explore")}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Add Mango <FiArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
