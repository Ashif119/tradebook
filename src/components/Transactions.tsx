import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  ArrowRight,
  ChevronDown,
  FileText
} from 'lucide-react';
import { TRANSACTIONS } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Transactions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {['All', 'Sale', 'Purchase', 'Payment In', 'Payment Out', 'Returns'].map((filter, i) => (
            <button 
              key={filter}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                i === 0 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-outline hover:bg-surface-container"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-surface-container-high rounded-xl text-sm font-bold text-on-surface-variant hover:border-primary transition-all">
            <Calendar className="w-4 h-4 text-primary" />
            01 Apr - 30 Apr
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-secondary-container text-primary px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary-container/20 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            New Sale
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-surface-container-high ledger-shadow overflow-hidden">
        <div className="p-6 border-b border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder="Search by invoice, party name..." 
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-outline hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-outline hover:text-primary transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Invoice No.</th>
                <th className="px-8 py-4">Party</th>
                <th className="px-8 py-4">Date & Time</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4 text-right">Amount</th>
                <th className="px-8 py-4 text-right">Balance</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {TRANSACTIONS.map((tx, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={tx.id} 
                  className="hover:bg-surface-container-lowest transition-colors group cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-on-surface">{tx.invoiceNo}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center text-primary font-bold text-[10px]">
                        {tx.partyInitials}
                      </div>
                      <span className="text-sm font-medium text-on-surface-variant">{tx.partyName}</span>
                    </div>
                  </td>
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
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-lg text-outline group-hover:text-primary transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-white p-8 rounded-[32px] border border-surface-container-high ledger-shadow flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Total Sale</p>
            <h4 className="text-2xl font-headline font-black text-green-600">₹ 8,45,900</h4>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Total Purchase</p>
            <h4 className="text-2xl font-headline font-black text-red-600">₹ 2,12,400</h4>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Net Balance</p>
            <h4 className="text-2xl font-headline font-black text-primary">₹ 6,33,500</h4>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-3 bg-surface-container-low text-on-surface font-bold rounded-2xl hover:bg-surface-container transition-all">
            Share Report
          </button>
          <button className="flex-1 md:flex-none px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            Print All
          </button>
        </div>
      </div>
    </div>
  );
};
