"use client";

import { motion } from "framer-motion";
import { FiStar, FiCheckCircle } from "react-icons/fi";

const Review = () => {
  const reviews = [
    {
      name: "Ahsan Habib",
      role: "Mango Lover",
      rating: 5,
      comment:
        "Absolutely blown away by the freshness! The Gopalbhog mangoes were delivered incredibly fast, and the authentic Rajshahi taste brought back childhood memories. Highly recommended!",
    },
    {
      name: "Tasnim Rahman",
      role: "Regular Customer",
      rating: 5,
      comment:
        "Finding 100% formalin-free mangoes is tough nowadays, but MangoCart has earned my complete trust. The cash on delivery service was super smooth and hazel-free.",
    },
    {
      name: "Saimon Karim",
      role: "Verified Buyer",
      rating: 4,
      comment:
        "Ordered a box of Langra mangoes. Every single piece was handpicked, mature, and perfectly sweet. Will definitely order again next season!",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 mt-4"
          >
            Real feedback from verified buyers who experienced the authentic
            taste of premium mangoes.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between items-start text-left"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-sm ${i < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                    />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-6">
                  `{rev.comment}`
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 border-t border-slate-200 pt-4 w-full">
                <div className="w-10 h-10 rounded-full bg-green-700 text-white font-bold text-sm flex items-center justify-center shadow-inner">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    {rev.name}
                    <FiCheckCircle
                      className="text-green-700 text-xs fill-green-500/10"
                      title="Verified Buyer"
                    />
                  </h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Review;
