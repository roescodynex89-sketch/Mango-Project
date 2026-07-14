"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full text-center">
        
        {/* Animated Icon & 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border-2 border-amber-200/50 shadow-inner">
            <FiAlertTriangle size={48} className="animate-pulse" />
          </div>
          
          <span className="text-sm font-extrabold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 uppercase tracking-widest">
            Error 404
          </span>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
            Page Not Found
          </h1>
          
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Back to Home Button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FiHome size={16} />
            Go back Home
          </Link>

          {/* Explore Mangoes Button */}
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-sm font-bold py-3 px-6 rounded-xl shadow-sm transition-all"
          >
            <FiSearch size={16} />
            Explore Mangoes
          </Link>
        </motion.div>

        {/* Footer/Help Note */}
        <p className="mt-10 text-xs text-slate-400">
          Need help? <Link href="/contact" className="underline hover:text-slate-600">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}