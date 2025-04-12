import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white">
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

      {/* Content */}
      <div className="relative w-full max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-gray-600">✨ Your Personal Finance Assistant</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#222222] tracking-tight leading-tight">
                Alfred – Your Family&apos;s{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#ff6601]">Finance Butler</span>
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-[#ff6601]/10 rounded-full z-0"
                  />
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-[#222222]/80 font-medium">
                Set it once. Budget forever.
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Let Alfred handle all your family finances, from account linking to budgeting and debt payments.
              Smart automation meets personalized financial management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#ff6601] text-white text-lg font-semibold rounded-xl
                         shadow-lg shadow-[#ff6601]/20 hover:bg-[#ff5500] transition-all duration-300"
              >
                Access Alfred
                <ArrowRightIcon className="w-6 h-6 ml-3" />
              </motion.button>
              
              <a href="#learn-more" 
                 className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#222222] text-lg font-semibold rounded-xl
                          border border-gray-200 hover:bg-gray-50 hover:border-[#ff6601]/20 transition-all duration-300">
                Learn more
              </a>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Bank-level Security
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Real-time Updates
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacy First
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 