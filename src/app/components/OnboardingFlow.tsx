'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const mockBanks = ['Bank of America', 'Chase', 'Wells Fargo', 'Citibank'];
const mockFamilyMembers = ['Mom', 'Dad', 'Kid1', 'Kid2'];
const mockCategories = ['Food', 'School', 'Fun', 'Transportation'];
const mockCreditCards = [
  { name: 'Alfred Platinum', color: '#222222', benefits: 'Premium Travel Rewards' },
  { name: 'Alfred Gold', color: '#FFD700', benefits: 'Cash Back on Family Expenses' },
  { name: 'Alfred Blue', color: '#0066cc', benefits: 'Education & Entertainment' },
];

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [savingsPercentage, setSavingsPercentage] = useState(20);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(prev => prev + 1);
    }, 3000);
  };

  const handleBankSelection = (bank: string) => {
    setSelectedBanks(prev => 
      prev.includes(bank) 
        ? prev.filter(b => b !== bank)
        : [...prev, bank]
    );
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div 
            className="space-y-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff8f5] border border-[#ff6601]/20">
                <span className="text-sm font-medium text-[#ff6601]">Step 1 of 4</span>
              </div>
              <h2 className="text-3xl font-bold text-[#222222]">Select Your Banks</h2>
              <p className="text-gray-600">Choose the banks you want to connect with Alfred</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockBanks.map(bank => (
                <motion.button
                  key={bank}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBankSelection(bank)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center ${
                    selectedBanks.includes(bank)
                      ? 'border-[#ff6601] bg-[#fff8f5] text-[#ff6601] shadow-lg shadow-[#ff6601]/10'
                      : 'border-gray-200 hover:border-[#ff6601] hover:bg-[#fff8f5] hover:shadow-lg hover:shadow-[#ff6601]/10'
                  }`}
                >
                  <span className="text-lg font-medium">{bank}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#ff6601] transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -10px rgba(255, 102, 1, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => simulateAnalysis()}
                disabled={selectedBanks.length === 0}
                className="group inline-flex items-center px-8 py-4 bg-[#ff6601] text-white rounded-2xl font-semibold text-lg
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         hover:bg-[#ff5500] transition-all duration-300 shadow-lg shadow-[#ff6601]/20"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing Your Accounts...</span>
                  </div>
                ) : (
                  'Continue'
                )}
              </motion.button>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            className="space-y-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff8f5] border border-[#ff6601]/20">
                <span className="text-sm font-medium text-[#ff6601]">Step 2 of 4</span>
              </div>
              <h2 className="text-3xl font-bold text-[#222222]">Monthly Savings Goal</h2>
              <p className="text-gray-600">Set your target monthly savings as a percentage of your income</p>
            </div>
            <div className="space-y-8">
              <div className="relative pt-8">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={savingsPercentage}
                  onChange={(e) => setSavingsPercentage(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer
                           accent-[#ff6601] focus:outline-none focus:ring-2 focus:ring-[#ff6601]/20"
                />
                <div className="absolute -top-2 left-0 right-0 flex justify-between px-2 text-sm text-gray-500">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>
              <motion.div 
                key={savingsPercentage}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-[#fff8f5] rounded-2xl p-6 border border-[#ff6601]/20"
              >
                <p className="text-center">
                  <span className="text-4xl font-bold text-[#ff6601]">{savingsPercentage}%</span>
                  <span className="text-xl text-gray-600 ml-2">of income</span>
                </p>
              </motion.div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#ff6601] transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -10px rgba(255, 102, 1, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(prev => prev + 1)}
                className="group inline-flex items-center px-8 py-4 bg-[#ff6601] text-white rounded-2xl font-semibold text-lg
                         hover:bg-[#ff5500] transition-all duration-300 shadow-lg shadow-[#ff6601]/20"
              >
                Set Savings Goal
              </motion.button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff8f5] border border-[#ff6601]/20">
                <span className="text-sm font-medium text-[#ff6601]">Step 3 of 4</span>
              </div>
              <h2 className="text-3xl font-bold text-[#222222]">Your Family&apos;s Budget</h2>
              <p className="text-gray-600">Review and customize budget allocations for each family member</p>
            </div>
            <div className="space-y-6">
              {mockFamilyMembers.map((member, index) => (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#ff6601]/20 
                           transition-all duration-200 hover:shadow-lg"
                >
                  <h3 className="font-semibold text-xl text-[#222222] mb-4">{member}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {mockCategories.map(category => (
                      <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600">{category}</span>
                        <span className="font-semibold text-[#ff6601]">
                          ${Math.floor(Math.random() * 500) + 100}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#ff6601] transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -10px rgba(255, 102, 1, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(prev => prev + 1)}
                className="group inline-flex items-center px-8 py-4 bg-[#ff6601] text-white rounded-2xl font-semibold text-lg
                         hover:bg-[#ff5500] transition-all duration-300 shadow-lg shadow-[#ff6601]/20"
              >
                Confirm Budgets
              </motion.button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            className="space-y-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff8f5] border border-[#ff6601]/20">
                <span className="text-sm font-medium text-[#ff6601]">Complete!</span>
              </div>
              <h2 className="text-3xl font-bold text-[#222222]">All Set!</h2>
              <p className="text-gray-600">Your family&apos;s financial butler is ready to serve</p>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-[#fff8f5] rounded-2xl border-2 border-[#ff6601]/20 space-y-4">
                {[
                  'Budgets configured',
                  'Automatic payments scheduled',
                  'Credit limits optimized'
                ].map((item, index) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center text-[#222222] font-medium bg-white p-4 rounded-xl shadow-sm"
                  >
                    <CheckCircleIcon className="w-6 h-6 mr-3 text-[#ff6601]" />
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* Credit Card Deck */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative h-64 my-8"
              >
                {mockCreditCards.map((card, index) => (
                  <motion.div
                    key={card.name}
                    className="absolute w-full"
                    style={{ 
                      top: index * 20,
                      zIndex: mockCreditCards.length - index,
                    }}
                    whileHover={{ 
                      y: -120,
                      rotateZ: 0,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    initial={{ 
                      rotateZ: (index - 1) * 3,
                      y: index * 20 
                    }}
                    animate={{ 
                      rotateZ: (index - 1) * 3,
                      y: index * 20 
                    }}
                  >
                    <div 
                      className="w-full h-48 rounded-2xl p-6 relative overflow-hidden group"
                      style={{ 
                        backgroundColor: card.color,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{
                             background: `linear-gradient(45deg, ${card.color}, rgba(255,255,255,0.2))`,
                           }}
                      />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white text-xl font-bold mb-2">{card.name}</h3>
                            <p className="text-white/80 text-sm">{card.benefits}</p>
                          </div>
                          <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                          </svg>
                        </div>
                        <div className="absolute bottom-6 right-6">
                          <div className="flex space-x-1">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="w-1 h-1 rounded-full bg-white/60"/>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Credit Card and App Download Reminders */}
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 bg-white rounded-2xl border-2 border-[#ff6601]/20 space-y-2"
                >
                  <h3 className="font-semibold text-lg text-[#222222] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#ff6601]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Credit Cards Coming Soon
                  </h3>
                  <p className="text-gray-600">Your credit cards are on their way! Once received, you can easily set them up with Apple Pay.</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-6 bg-white rounded-2xl border-2 border-[#ff6601]/20 space-y-2"
                >
                  <h3 className="font-semibold text-lg text-[#222222] flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#ff6601]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download Our App
                  </h3>
                  <p className="text-gray-600">Download the Alfred app to monitor your family's spending throughout the month.</p>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -10px rgba(255, 102, 1, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-4 px-6 bg-[#ff6601] text-white rounded-2xl font-semibold text-lg
                         hover:bg-[#ff5500] transition-all duration-300 shadow-lg shadow-[#ff6601]/20
                         flex items-center justify-center space-x-2"
              >
                <span>Open Dashboard</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
} 