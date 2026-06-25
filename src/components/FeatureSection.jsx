// components/FeatureSection.jsx
"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Globe, 
  Database, 
  Layers, 
  RefreshCw,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Get your prompts in milliseconds with our optimized delivery system.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and security protocols to protect your data.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Community",
    description: "Connect with creators from 100+ countries sharing insights daily.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Rich Library",
    description: "Access 5,000+ curated prompts across 50+ categories and niches.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Smart Filtering",
    description: "Find exactly what you need with advanced search and filtering options.",
    color: "from-rose-500 to-red-500",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600"
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Weekly Updates",
    description: "Stay ahead with fresh prompts added every week based on trends.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* হেডার */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Succeed
            </span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Packed with powerful tools and features to help you create better prompts faster.
          </p>
        </motion.div>

        {/* ফিচার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={feature.iconColor}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className={`mt-4 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-16 transition-all duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;