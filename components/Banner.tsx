"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiStar,
  FiAward,
  FiShield,
  FiTruck,
  FiDollarSign,
} from "react-icons/fi";

const Banner = () => {
  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-amber-100 overflow-hidden py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Accent */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm"
            >
              <FiStar className="text-amber-500 fill-amber-500" />
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                A paradise of 100% pure and premium mangoes.
              </span>
            </motion.div>

            {/* Heading Text */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Fresh mangoes from the best garden <br />
              Now it's your turn. <span className="text-green-700">Mango</span>
              <span className="text-amber-500">Cart</span>!
            </motion.h1>

            {/* Body Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience the authentic taste of a wide variety of
              mangoes—including Langra, Gopalbhog, Fazli, and
              Himsagar—handpicked directly from trusted orchards in Rajshahi.
              Check reviews, view ratings, and easily get your favorite mangoes
              delivered to your home.
            </motion.p>

            {/* Call to Actions (Buttons) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/Explore"
                className="group flex items-center gap-2 bg-amber-500 hover:bg-orange-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md transition-all duration-200 w-full sm:w-auto text-center justify-center"
              >
                Explore Mangoes
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center bg-white border border-slate-200 text-green-700 hover:bg-green-800 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 w-full sm:w-auto"
              >
                MangoWorld
              </Link>
            </motion.div>

            {/* Mini Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div className="flex items-center gap-2">
                <FiAward className="text-green-700 text-xl shrink-0" />
                <span className="text-xs font-medium text-slate-500">
                  Best Quality
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-green-700 text-xl shrink-0" />
                <span className="text-xs font-medium text-slate-500">
                  100% Organic
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-green-700 text-xl shrink-0" />
                <span className="text-xs font-medium text-slate-500">
                  Verified Reviews
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Visual glow backdrop for the image */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-green-600/20 to-amber-500/20 rounded-full filter blur-2xl top-10" />

            {/* Image Wrap Container with Floating Animation */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] drop-shadow-xl z-10 flex flex-col justify-between"
            >
              {/* Top Left Badge - Formalin Free */}
              <div className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1 border border-green-600">
                <FiShield className="text-amber-400 fill-amber-400" /> Formalin
                Free
              </div>

              {/* Main Mango Image */}
              <div className="relative w-full h-[85%] rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 shadow-inner">
                <Image
                  src="/mango.jpg"
                  alt="Premium Fresh Mangoes"
                  fill
                  priority
                  className="object-cover rounded-xl"
                  sizes="(max-w-768px) 100vw, 400px"
                />
              </div>

              {/* Bottom Metadata Info (Rating, Fast Delivery, COD) */}
              <div className="mt-3 bg-white border border-slate-200 rounded-xl p-3 shadow-md grid grid-cols-3 gap-1 text-center divide-x divide-slate-100">
                {/* Rating */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-amber-500">
                    <FiStar className="fill-amber-500 text-sm" />
                    <span className="text-sm font-bold text-slate-900">
                      4.9
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Top Rated
                  </span>
                </div>

                {/* Fast Delivery */}
                <div className="flex flex-col items-center justify-center px-1">
                  <FiTruck className="text-green-700 text-base mb-0.5" />
                  <span className="text-[10px] text-slate-600 font-bold leading-tight">
                    Fast Delivery
                  </span>
                </div>

                {/* COD */}
                <div className="flex flex-col items-center justify-center">
                  <FiDollarSign className="text-green-700 text-base mb-0.5" />
                  <span className="text-[10px] text-slate-600 font-bold leading-tight">
                    COD Available
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
