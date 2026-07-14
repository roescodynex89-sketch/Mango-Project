"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiEye,
  FiUser,
  FiDollarSign,
  FiLoader,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";

interface Mango {
  _id: string;
  title: string;
  description: string;
  price: number;
  variety: string;
  image: string;
  userName?: string;
}

export default function HomeMango() {
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeMangoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/mangoes?limit=4`,
        );
        if (!res.ok) throw new Error("Failed to load fresh mangoes stock.");

        const result = await res.json();

        const topFour = (result.data || []).slice(0, 4);
        setMangoes(topFour);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeMangoes();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center bg-slate-50">
        <FiLoader className="animate-spin text-amber-500" size={36} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 flex flex-col items-center justify-center bg-slate-100 text-center px-4">
        <FiAlertCircle className="text-red-500 mb-2" size={40} />
        <p className="text-slate-700 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-amber-100 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-green-700 font-bold text-xs uppercase tracking-wider px-3 py-1 bg-green-50 rounded-full border border-green-200">
              Fresh Arrivals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Premium Mango Collection
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-md">
              Directly sourced from organic orchards. Handpicked premium quality
              just for you.
            </p>
          </div>

          <Link
            href="/Explore"
            className="group flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-800 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            See All Stock
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mangoes.map((mango, index) => (
            <motion.div
              key={mango._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={mango.image}
                    alt={mango.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-green-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full z-10 uppercase tracking-wide">
                    {mango.variety}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1 hover:text-green-700 transition-colors">
                    {mango.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {mango.description}
                  </p>

                  {/* Authored by */}
                  <div className="flex items-center gap-1.5 mt-3.5 text-slate-400 text-[11px] font-medium">
                    <FiUser size={12} className="text-slate-400" />
                    <span>
                      By:{" "}
                      <span className="text-slate-700 font-semibold">
                        {mango.userName || "Orchard Owner"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="px-4 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center text-slate-900 font-black text-base">
                  <FiDollarSign className="text-amber-500 mr-0.5" size={16} />
                  {mango.price}
                  <span className="text-[10px] text-slate-400 font-normal">
                    /KG
                  </span>
                </div>
                <Link
                  href={`/Explore/${mango._id}`}
                  className="bg-amber-500 hover:bg-orange-500 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm flex items-center gap-1 transition-all duration-200"
                >
                  <FiEye size={13} /> View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
