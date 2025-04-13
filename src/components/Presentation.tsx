'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  CogIcon,
  SparklesIcon,
  StarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import React from 'react';

interface Feature {
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

interface Impact {
  title: string;
  description: string;
}

type SlideContent = {
  who?: string;
  what?: string;
  why?: string;
  points?: string[];
  evidence?: string;
  features?: Feature[];
  example?: string;
  benefits?: Benefit[];
  dataPoint?: string;
  impacts?: Impact[];
  tagline?: string;
  citations?: string[];
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: SlideContent;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string; } & React.RefAttributes<SVGSVGElement>>;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Introducing Alfred",
    subtitle: "Your Family Financial Butler",
    content: {
      who: "A smart financial management system designed for families.",
      what: "Automatically tracks all income and expenses, profiles debt and bills, sets savings goals, and enforces budgets via pre-fixed credit cards with hard limits for each family member.",
      why: "Simplifies budgeting, reduces financial stress, and ensures everyone stays on track—like a trusted family butler for your finances."
    },
    icon: UserGroupIcon,
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Family Finance Pain Points",
    content: {
      points: [
        "Lack of Visibility: Families struggle to track spending across multiple accounts.",
        "Overspending: Difficult to stick to budgets, leading to debt or missed savings goals.",
        "Financial Stress: Managing bills, debt, and shared expenses creates emotional strain.",
        "Coordination Challenges: Splitting costs and aligning family members is complex."
      ],
      evidence: "Research shows 45% of families support relatives financially, adding $10,000/year in stress (Forbes, 2019). Budget adherence is a top hurdle (NerdWallet, 2025)."
    },
    icon: ExclamationTriangleIcon,
  },
  {
    id: 3,
    title: "Alfred's Solution",
    subtitle: "How It Works",
    content: {
      features: [
        {
          title: "Unified Tracking",
          description: "Connects all bank accounts for real-time expense monitoring."
        },
        {
          title: "Smart Profiling",
          description: "Categorizes debt, rent, utilities, and other costs to prioritize essentials."
        },
        {
          title: "Savings Goals",
          description: "Sets realistic targets for emergencies, education, or vacations."
        },
        {
          title: "Hard-Limit Credit Cards",
          description: "Enforces budgets with pre-fixed spending caps for each family member, inspired by corporate tools like Brex."
        }
      ],
      example: "$500 grocery budget? Alfred's card stops transactions beyond the limit."
    },
    icon: CogIcon,
  },
  {
    id: 4,
    title: "Benefits of Alfred",
    subtitle: "Why Choose Alfred?",
    content: {
      benefits: [
        {
          title: "Saves Time",
          description: "Automates tracking and budgeting—no manual spreadsheets."
        },
        {
          title: "Prevents Overspending",
          description: "Hard limits ensure discipline across the family."
        },
        {
          title: "Reduces Stress",
          description: "Clear financial overview and enforced budgets bring peace of mind."
        },
        {
          title: "Empowers Families",
          description: "Builds savings and financial literacy with minimal effort."
        }
      ],
      dataPoint: "Budgeting tools reduce financial anxiety for 60% of users (Bankrate, 2025)."
    },
    icon: SparklesIcon,
  },
  {
    id: 5,
    title: "How Alfred Stands Out",
    subtitle: "Unique Value Proposition",
    content: {
      features: [
        {
          title: "Unique Enforcement",
          description: "Unlike YNAB or Mint, Alfred actively controls spending via credit card limits."
        },
        {
          title: "Family-Focused",
          description: "Designed for shared expenses and multi-member coordination."
        },
        {
          title: "Secure & Simple",
          description: "Robust security for bank data, user-friendly for all ages."
        },
        {
          title: "Future-Ready",
          description: "Built on proven tech (e.g., Brex's limit-setting), tailored for households."
        }
      ]
    },
    icon: StarIcon,
  },
  {
    id: 6,
    title: "Potential Impact",
    subtitle: "Transforming Family Finance",
    content: {
      impacts: [
        {
          title: "Financial Control",
          description: "Families gain clarity and stay within budgets."
        },
        {
          title: "Debt Reduction",
          description: "Prioritizes repayments while building savings."
        },
        {
          title: "Harmony at Home",
          description: "Aligns family members on shared goals, reducing disputes."
        },
        {
          title: "Scalable Solution",
          description: "Could revolutionize how families manage money in 2025 and beyond."
        }
      ]
    },
    icon: ChartBarIcon,
  },
  {
    id: 7,
    title: "Call to Action",
    subtitle: "Take Control Today",
    content: {
      points: [
        "Why Wait? Financial stress doesn't have to rule your family.",
        "Meet Alfred: Ready to manage, enforce, and simplify your finances.",
        "Next Steps: Explore Alfred's demo or contact us to bring your family's financial butler to life."
      ],
      tagline: "Alfred: Your Finances, Managed with Care",
      citations: [
        "Forbes (2019): The 3 Big Financial Pain Points Of Americans",
        "NerdWallet (2025): How to Budget",
        "Bankrate (2025): Bank Accounts With Budgeting Tools",
        "Brex (2024): Manage Budgets and Spend Limits"
      ]
    },
    icon: ArrowTrendingUpIcon,
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Presentation() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [page, autoPlay]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const paginate = (newDirection: number) => {
    setPage(([current]) => {
      const newPage = current + newDirection;
      return [
        newPage < 0 ? slides.length - 1 : newPage >= slides.length ? 0 : newPage,
        newDirection
      ];
    });
  };

  const renderSlideContent = (slide: typeof slides[0]) => {
    switch (slide.id) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-[#ff6601]">Who is Alfred?</h4>
              <p className="text-gray-600 text-xl leading-relaxed">{slide.content.who}</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-[#ff6601]">What does Alfred do?</h4>
              <p className="text-gray-600 text-xl leading-relaxed">{slide.content.what}</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-[#ff6601]">Why Alfred?</h4>
              <p className="text-gray-600 text-xl leading-relaxed">{slide.content.why}</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {slide.content.points?.map((point, index) => (
                <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                  <p className="text-gray-700 text-xl">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-[#ff6601]/5 rounded-xl p-6">
              <p className="text-gray-600 italic text-lg">{slide.content.evidence}</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {slide.content.features?.map((feature, index) => (
                <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[#ff6601] mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#ff6601]/5 rounded-xl p-6">
              <p className="text-gray-700 font-medium text-xl">Example: {slide.content.example}</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {slide.content.benefits?.map((benefit, index) => (
                <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[#ff6601] mb-3">{benefit.title}</h4>
                  <p className="text-gray-600 text-lg">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#ff6601]/5 rounded-xl p-6">
              <p className="text-gray-700 italic text-xl">{slide.content.dataPoint}</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {slide.content.features?.map((feature, index) => (
              <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                <h4 className="text-xl font-semibold text-[#ff6601] mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        );

      case 6:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {slide.content.impacts?.map((impact, index) => (
              <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                <h4 className="text-xl font-semibold text-[#ff6601] mb-3">{impact.title}</h4>
                <p className="text-gray-600 text-lg">{impact.description}</p>
              </div>
            ))}
          </div>
        );

      case 7:
        return (
          <div className="space-y-10">
            <div className="space-y-6">
              {slide.content.points?.map((point, index) => (
                <div key={index} className="bg-[#fff8f5] rounded-xl p-6">
                  <p className="text-gray-700 text-xl">{point}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#ff6601] text-white rounded-xl p-8 text-center">
              <p className="text-3xl font-semibold">{slide.content.tagline}</p>
            </div>
            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-lg font-medium text-gray-500 mb-4">Citations</h4>
              <div className="space-y-3">
                {slide.content.citations?.map((citation, index) => (
                  <p key={index} className="text-base text-gray-600">{citation}</p>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden min-h-[800px]"
         onMouseEnter={() => setAutoPlay(false)}
         onMouseLeave={() => setAutoPlay(true)}
         onClick={() => paginate(1)}
         role="button"
         tabIndex={0}
         onKeyDown={(e) => {
           if (e.key === ' ' || e.key === 'Enter') {
             e.preventDefault();
             paginate(1);
           }
         }}
         >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="space-y-8">
              {/* Slide Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-[#ff6601]">
                    {slides[page].subtitle}
                  </h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#222222]">
                    {slides[page].title}
                  </h2>
                </div>
                <div className="w-16 h-16 text-[#ff6601]">
                  {React.createElement(slides[page].icon)}
                </div>
              </div>

              {/* Dynamic Slide Content */}
              <div className="text-lg">
                {renderSlideContent(slides[page])}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3"
           onClick={(e) => e.stopPropagation()}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              const direction = index > page ? 1 : -1;
              setPage([index, direction]);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              page === index
                ? "bg-[#ff6601] w-8"
                : "bg-gray-300 hover:bg-[#ff6601]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
} 