import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  ShoppingBag,
  Plus,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { TRANSACTIONS } from '../constants';
import { motion } from 'motion/react';

const salesData = [
  { name: 'Mon', sales: 45000 },
  { name: 'Tue', sales: 52000 },
  { name: 'Wed', sales: 38000 },
  { name: 'Thu', sales: 65000 },
  { name: 'Fri', sales: 48000 },
  { name: 'Sat', sales: 72000 },
  { name: 'Sun', sales: 31000 },
];

const partyBalanceData = [
  { name: 'Receivable', value: 75, color: '#00685d' },
  { name: 'Payable', value: 25, color: '#feb300' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "You'll Get", value: 1245900, icon: ArrowUpRight, color: "text-primary", bg: "bg-primary/10" },
          { label: "You'll Give", value: 345000, icon: ArrowDownLeft, color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Today's Sale", value: 45600, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Today's Purchase", value: 12400, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={kpi.label} 
            className="bg-white p-6 rounded-3xl border border-surface-container-high ledger-shadow group hover:border-primary/20 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", kpi.bg)}>
                <kpi.icon className={cn("w-6 h-6", kpi.color)} />
              </div>
              <button className="p-2 hover:bg-surface-container rounded-lg">
                <MoreVertical className="w-5 h-5 text-outline" />
              </button>
            </div>
            <p className="text-sm font-medium text-outline mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-headline font-extrabold text-on-surface">
              {formatCurrency(kpi.value)}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-surface-container-high ledger-shadow"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-headline font-bold">Weekly Sales Performance</h3>
              <p className="text-sm text-outline">Comparison of sales across the week</p>
            </div>
            <select className="bg-surface-container-low border-none rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6d7a77', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6d7a77', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f9f9f9' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#00685d" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[32px] border border-surface-container-high ledger-shadow flex flex-col"
        >
          <h3 className="text-xl font-headline font-bold mb-2">Party Balance Net</h3>
          <p className="text-sm text-outline mb-8">Receivable vs Payable distribution</p>
          
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={partyBalanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {partyBalanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-headline font-black text-primary">75%</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Receivable</span>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {partyBalanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-on-surface-variant">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[32px] border border-surface-container-high ledger-shadow overflow-hidden"
      >
        <div className="p-8 flex items-center justify-between border-b border-surface-container">
          <div>
            <h3 className="text-xl font-headline font-bold">Recent Transactions</h3>
            <p className="text-sm text-outline">Latest activity across all parties</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Party</th>
                <th className="px-8 py-4">Invoice No.</th>
                <th className="px-8 py-4">Date & Time</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4 text-right">Amount</th>
                <th className="px-8 py-4 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-lowest transition-colors group cursor-default">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-surface-container rounded-xl flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                        {tx.partyInitials}
                      </div>
                      <span className="font-bold text-on-surface">{tx.partyName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-on-surface-variant">{tx.invoiceNo}</td>
                  <td className="px-8 py-5 text-sm text-outline">{tx.date}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      tx.type === 'SALE' ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                    )}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-on-surface">{formatCurrency(tx.amount)}</td>
                  <td className="px-8 py-5 text-right font-bold text-primary">{formatCurrency(tx.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
