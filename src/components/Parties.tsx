import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  MessageSquare, 
  Printer, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  History
} from 'lucide-react';
import { PARTIES, TRANSACTIONS } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Parties: React.FC<{ onSelectParty: (id: string) => void }> = ({ onSelectParty }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {['All', "You'll Get", "You'll Give"].map((filter, i) => (
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
          <button className="p-2.5 bg-white border border-surface-container-high rounded-xl text-outline hover:text-primary transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-secondary-container text-primary px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary-container/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
            New Party
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-surface-container-high ledger-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Party Name</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Last Active</th>
                <th className="px-8 py-4 text-right">Balance</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {PARTIES.map((party, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={party.id} 
                  onClick={() => onSelectParty(party.id)}
                  className="hover:bg-surface-container-lowest transition-colors group cursor-pointer"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-surface-container rounded-2xl flex items-center justify-center text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-all">
                        {party.initials}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{party.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-outline font-medium mt-0.5">
                          <Phone className="w-3 h-3" /> {party.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-surface-container rounded-lg text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      {party.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-outline">{party.lastActive}</td>
                  <td className="px-8 py-5 text-right">
                    <p className={cn(
                      "font-black text-lg",
                      party.balanceType === 'get' ? "text-primary" : "text-secondary"
                    )}>
                      {formatCurrency(party.balance)}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-outline mt-0.5">
                      {party.balanceType === 'get' ? "You'll Get" : "You'll Give"}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-outline" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-primary text-white p-6 rounded-[32px] ledger-shadow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200 mb-1">Total Receivable</p>
            <h4 className="text-2xl font-headline font-black">₹ 1,24,59,000</h4>
          </div>
          <div className="w-[1px] h-10 bg-white/20 hidden md:block"></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200 mb-1">Total Payable</p>
            <h4 className="text-2xl font-headline font-black text-secondary-container">₹ 3,45,000</h4>
          </div>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export const PartyDetails: React.FC<{ partyId: string, onBack: () => void }> = ({ partyId, onBack }) => {
  const party = PARTIES.find(p => p.id === partyId) || PARTIES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-160px)]">
      {/* Left List */}
      <div className="lg:col-span-1 bg-white rounded-[32px] border border-surface-container-high ledger-shadow flex flex-col overflow-hidden">
        <div className="p-6 border-b border-surface-container">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder="Search parties..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {PARTIES.map((p) => (
            <button 
              key={p.id}
              className={cn(
                "w-full p-4 flex items-center gap-3 border-b border-surface-container transition-all text-left",
                p.id === partyId ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-surface-container-low"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs",
                p.id === partyId ? "bg-primary text-white" : "bg-surface-container text-outline"
              )}>
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{p.name}</p>
                <p className={cn(
                  "text-[10px] font-bold",
                  p.balanceType === 'get' ? "text-primary" : "text-secondary"
                )}>
                  {formatCurrency(p.balance)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Details */}
      <div className="lg:col-span-3 flex flex-col gap-8 overflow-y-auto no-scrollbar pr-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[32px] border border-surface-container-high ledger-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20">
                {party.initials}
              </div>
              <div>
                <h3 className="text-3xl font-headline font-black text-on-surface">{party.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-sm text-outline font-medium">
                    <Phone className="w-4 h-4" /> {party.phone}
                  </span>
                  <span className="px-3 py-1 bg-surface-container rounded-lg text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    {party.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Current Balance</p>
              <h4 className={cn(
                "text-4xl font-headline font-black",
                party.balanceType === 'get' ? "text-primary" : "text-secondary"
              )}>
                {formatCurrency(party.balance)}
              </h4>
              <p className="text-xs font-bold text-outline mt-1">
                {party.balanceType === 'get' ? "You'll Get" : "You'll Give"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-primary text-white rounded-3xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <ArrowDownLeft className="w-6 h-6" />
              <span className="font-bold text-sm">Receive Payment</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-secondary-container text-primary rounded-3xl shadow-lg shadow-secondary-container/20 hover:scale-105 transition-all">
              <ArrowUpRight className="w-6 h-6" />
              <span className="font-bold text-sm">Give Payment</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-low text-on-surface rounded-3xl hover:bg-surface-container transition-all">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span className="font-bold text-sm">Chat</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-low text-on-surface rounded-3xl hover:bg-surface-container transition-all">
              <Printer className="w-6 h-6 text-outline" />
              <span className="font-bold text-sm">Print Ledger</span>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[32px] border border-surface-container-high ledger-shadow overflow-hidden flex-1"
        >
          <div className="p-8 border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-headline font-bold">Transaction History</h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg text-outline">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-container rounded-lg text-outline">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Type</th>
                  <th className="px-8 py-4">Invoice No.</th>
                  <th className="px-8 py-4 text-right">Amount</th>
                  <th className="px-8 py-4 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-8 py-5 text-sm text-on-surface font-medium">{tx.date}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        tx.type === 'SALE' ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                      )}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-outline">{tx.invoiceNo}</td>
                    <td className="px-8 py-5 text-right font-bold text-on-surface">{formatCurrency(tx.amount)}</td>
                    <td className="px-8 py-5 text-right font-bold text-primary">{formatCurrency(tx.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
