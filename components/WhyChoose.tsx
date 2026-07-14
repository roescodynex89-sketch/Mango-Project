"use client";

import { motion ,Variants } from "framer-motion";
import { FiTrendingUp, FiShield, FiMapPin, FiTruck, FiUsers, FiCheckCircle } from "react-icons/fi";

const WhyChoose = () => {
  // Features Data
  const features = [
    {
      icon: <FiMapPin className="text-green-700 text-2xl" />,
      title: "Direct From Rajshahi",
      description: "Sourced directly from the finest, authentic orchards in Rajshahi, ensuring the true heritage taste.",
    },
    {
      icon: <FiShield className="text-green-700 text-2xl" />,
      title: "100% Formalin Free",
      description: "Your health is our priority. We guarantee completely natural fruits without any harmful chemicals or carbide.",
    },
    {
      icon: <FiCheckCircle className="text-green-700 text-2xl" />,
      title: "Handpicked Quality",
      description: "Every single mango undergoes a rigorous quality check before being safely packed into your cart.",
    },
    {
      icon: <FiTruck className="text-green-700 text-2xl" />,
      title: "Super Fast Delivery",
      description: "Carefully packaged and delivered straight to your doorstep while preserving the absolute freshness.",
    },
    {
      icon: <FiTrendingUp className="text-green-700 text-2xl" />,
      title: "Transparent Pricing",
      description: "Fair and honest market-driven pricing with no hidden charges, providing value for money.",
    },
    {
      icon: <FiUsers className="text-green-700 text-2xl" />,
      title: "Community Reviews",
      description: "Read real experiences, absolute ratings, and feedback from hundreds of fellow mango lovers.",
    },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants :Variants  = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-amber-100 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-500 font-bold tracking-wider text-sm uppercase block mb-2"
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            The Best Mango Experience Ever
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed"
          >
            We bridges the gap between traditional mango orchards and your modern dynamic lifestyle, ensuring premium quality in every bite.
          </motion.p>
        </div>

        {/* Features Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start text-left"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center border border-slate-200 mb-5 flex-shrink-0">
                {feature.icon}
              </div>

              {/* Text Info */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChoose;