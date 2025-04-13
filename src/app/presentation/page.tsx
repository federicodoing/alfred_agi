'use client';

import { motion } from 'framer-motion';
import Presentation from '@/components/Presentation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PresentationPage() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-[#ff6601]/10 to-transparent blur-3xl transform rotate-12"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#ff6601]/5 to-transparent blur-3xl"
        />
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-[#222222] hover:text-[#ff6601] transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="relative w-full min-h-screen flex items-center justify-center py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Presentation />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 