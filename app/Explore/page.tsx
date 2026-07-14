"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiUser,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
  FiAlertCircle,
  FiSearch,
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

export default function ExplorePage() {
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [priceOrder, setPriceOrder] = useState<
    "default" | "lowToHigh" | "highToLow"
  >("default");

  useEffect(() => {
    const fetchMangoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/mangoes?page=${page}`,
        );
        if (!res.ok) throw new Error("Failed to load fresh mangoes stock.");

        const result = await res.json();
        setMangoes(result.data);
        setTotalPages(result.totalPages);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMangoes();
  }, [page]);

  const filteredMangoes = useMemo(() => {
    let result = [...mangoes];

    if (searchQuery.trim() !== "") {
      result = result.filter((mango) =>
        mango.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // ২. Price Sorting Filter
    if (priceOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [mangoes, searchQuery, priceOrder]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
        <FiLoader className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col items-center justify-center p-4">
        <FiAlertCircle className="text-red-500 mb-2" size={48} />
        <h3 className="text-xl font-bold text-slate-900">{error}</h3>
        <button
          onClick={() => setPage(1)}
          className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-xl transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Fresh Mangoes
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Pick the best, premium and 100% organic mangoes directly sourced
            from top orchards.
          </p>
        </div>

        {/* --- Filter Section --- */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Title Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <FiSearch size={18} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mangoes by title..."
              className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Price Sort Dropdown */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide whitespace-nowrap">
              Sort By Price:
            </label>
            <select
              value={priceOrder}
              onChange={(e) => setPriceOrder(e.target.value as any)}
              className="w-full sm:w-48 bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all cursor-pointer"
            >
              <option value="default">Default (Newest)</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mangoes Grid */}
        {filteredMangoes.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-slate-600 font-medium text-lg">
              No mangoes found matching your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setPriceOrder("default");
              }}
              className="mt-3 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredMangoes.map((mango, index) => (
                <motion.div
                  key={mango._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={mango.image}
                        alt={mango.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                        {mango.variety}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                        {mango.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                        {mango.description}
                      </p>

                      {/* Authored by */}
                      <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs font-medium">
                        <FiUser size={14} />
                        <span>
                          Authored by:{" "}
                          <span className="text-slate-900 font-semibold">
                            {mango.userName || "Orchard Owner"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Part */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center text-slate-900 font-extrabold text-lg">
                      <FiDollarSign className="text-amber-500 mr-0.5" />
                      {mango.price}
                      <span className="text-xs text-slate-500 font-normal">
                        /KG
                      </span>
                    </div>
                    <Link
                      href={`/Explore/${mango._id}`}
                      className="bg-amber-500 hover:bg-orange-500 text-white text-sm font-bold py-2 px-4 rounded-xl shadow-sm flex items-center gap-1.5 transition-all duration-200"
                    >
                      <FiEye /> View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && searchQuery === "" && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              <FiChevronLeft size={20} />
            </button>
            <span className="text-sm font-bold text-slate-900 px-4 py-2 bg-white border border-slate-200 rounded-xl">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
