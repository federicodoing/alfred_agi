'use client';

import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CreditCardIcon, 
  UserGroupIcon, 
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const mockTransactions = [
  { id: 1, name: 'Grocery Shopping', amount: -156.32, member: 'Mom', category: 'Food' },
  { id: 2, name: 'Soccer Practice', amount: -45.00, member: 'Kid1', category: 'Sports' },
  { id: 3, name: 'Salary Deposit', amount: 3200.00, member: 'Dad', category: 'Income' },
  { id: 4, name: 'School Supplies', amount: -89.99, member: 'Kid2', category: 'Education' },
];

const familySpending = [
  { member: 'Mom', spent: 850, budget: 1000, color: '#FF6B6B' },
  { member: 'Dad', spent: 620, budget: 800, color: '#4ECDC4' },
  { member: 'Kid1', spent: 120, budget: 200, color: '#45B7D1' },
  { member: 'Kid2', spent: 90, budget: 150, color: '#96CEB4' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Family Dashboard</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-[#ff6601] bg-[#fff8f5] rounded-xl font-medium hover:bg-[#ff6601] hover:text-white transition-colors">
              Add Transaction
            </button>
            <button className="px-4 py-2 bg-[#ff6601] text-white rounded-xl font-medium hover:bg-[#ff5500] transition-colors">
              Family Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Total Balance',
              value: '$12,450.32',
              icon: BanknotesIcon,
              trend: '+2.5%',
              trendUp: true,
              color: '#10B981'
            },
            {
              title: 'Monthly Spending',
              value: '$3,240.00',
              icon: ChartBarIcon,
              trend: '-5.2%',
              trendUp: false,
              color: '#EF4444'
            },
            {
              title: 'Savings Goal',
              value: '68%',
              icon: ArrowTrendingUpIcon,
              trend: '+8.1%',
              trendUp: true,
              color: '#6366F1'
            },
            {
              title: 'Active Cards',
              value: '4',
              icon: CreditCardIcon,
              trend: 'All Active',
              color: '#8B5CF6'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              {stat.trend && (
                <div className="mt-4 flex items-center">
                  {stat.trendUp ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend} from last month
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Family Spending */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Family Spending</h2>
            <div className="space-y-4">
              {familySpending.map((member, index) => (
                <motion.div
                  key={member.member}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{member.member}</span>
                    <span className="text-gray-900 font-medium">${member.spent} / ${member.budget}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(member.spent / member.budget) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: member.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {mockTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.member} • {transaction.category}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-[#ff6601] bg-[#fff8f5] rounded-xl font-medium hover:bg-[#ff6601] hover:text-white transition-colors">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 