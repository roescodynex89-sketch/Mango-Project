"use client";

import { motion } from "framer-motion";
import {
  FiShield,
  FiMapPin,
  FiCheckCircle,
  FiTarget,
  FiTruck,
  FiSun,
  FiHeart,
} from "react-icons/fi";

const Moving = () => {
  const marqueeItems = [
    { text: "Premium Mangoes 🥭", icon: <FiSun className="text-amber-500" /> },
    {
      text: "100% Formalin Free 🚫",
      icon: <FiShield className="text-green-700" />,
    },
    {
      text: "Direct from Rajshahi 🌳",
      icon: <FiMapPin className="text-amber-500" />,
    },
    {
      text: "Carbide Free 🌿",
      icon: <FiCheckCircle className="text-green-700" />,
    },
    {
      text: "Handpicked Quality 🎯",
      icon: <FiTarget className="text-amber-500" />,
    },
    {
      text: "Cash on Delivery 📦",
      icon: <FiTruck className="text-green-700" />,
    },
    {
      text: "100% Organic & Fresh ✨",
      icon: <FiSun className="text-amber-500" />,
    },
    {
      text: "Satisfaction Guaranteed 🤝",
      icon: <FiHeart className="text-green-700 fill-green-700/20" />,
    },
  ];

  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative w-full  bg-amber-300 border-y border-slate-200 py-4 overflow-hidden shadow-sm">
      {/* Left Blur Fade Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

      {/* Right Blur Fade Effect */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Container */}
      <div className="flex w-max">
        <motion.div
          className="flex space-x-12 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap bg-slate-50 border border-slate-200 px-4 py-2 rounded-full"
            >
              <span className="text-lg flex items-center justify-center">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-slate-900 tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Moving;
