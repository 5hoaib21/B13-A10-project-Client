"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  Rocket, 
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Hand-crafted prompts by industry experts, tested and optimized for maximum performance.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Access",
      description: "Get immediate access to our entire library of high-converting prompts and templates.",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Quality",
      description: "Every prompt is rigorously tested and verified by our quality assurance team.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Join 10,000+ creators sharing insights and improving prompts together.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Regular Updates",
      description: "Stay ahead with weekly updates featuring the latest AI trends and techniques.",
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Support",
      description: "Get dedicated support from our team of AI specialists and prompt engineers.",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "5K+", label: "Premium Prompts" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute inset-0 bg-grid-gray-100/50 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-50/50 to-transparent -z-10" />
      
      {/* ফ্লোটিং এলিমেন্টস */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-6xl opacity-10 hidden lg:block"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 text-6xl opacity-10 hidden lg:block"
      >
        🚀
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* সেকশন হেডার */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            Built for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Creators
            </span>
            , by Creators
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            Everything you need to create, optimize, and scale your AI-powered content creation workflow.
          </motion.p>
        </motion.div>

        {/* স্ট্যাটস */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 * index }}
                className="text-2xl sm:text-3xl font-black text-blue-600"
              >
                {stat.number}
              </motion.div>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* বেনিফিটস গ্রিড */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* আইকন */}
              <div className={`w-14 h-14 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={benefit.iconColor}>
                  {benefit.icon}
                </div>
              </div>

              {/* টাইটেল */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>

              {/* ডেসক্রিপশন */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* হোভার ইন্ডিকেটর */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl`} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA সেকশন */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-1 shadow-sm hover:shadow-lg transition-all duration-300">
            <span className="px-4 py-2 text-sm text-gray-600">
              Ready to transform your workflow?
            </span>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;