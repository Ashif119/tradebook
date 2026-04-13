import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  ArrowRight,
  MoreHorizontal,
  History
} from 'lucide-react';
import { ITEMS } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

export const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-[32px] border border-surface-container-high ledger-shadow flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Total Items</p>
            <h4 className="text-2xl font-headline font-black">1,248</h4>
            <p className="text-[10px] text-green-600 font-bold mt-1">+12 this month</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-[32px] border border-surface-container-high ledger-shadow flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-secondary-container/10 rounded-2xl flex items-center justify-center text-secondary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Inventory Value</p>
            <h4 className="text-2xl font-headline font-black">₹ 14,50,000</h4>
            <p className="text-[10px] text-outline font-bold mt-1">Based on purchase price</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-center gap-6"
        >
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">Low Stock Alert</p>
            <h4 className="text-2xl font-headline font-black text-red-600">24 Items</h4>
            <p className="text-[10px] text-red-500 font-bold mt-1">Needs immediate attention</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {['All Items', 'Low Stock', 'Out of Stock', 'Fast Moving'].map((filter, i) => (
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
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-surface-container-high rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-secondary-container text-primary px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary-container/20 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Add New Item
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-surface-container-high ledger-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-outline text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Item Name</th>
                <th className="px-8 py-4">Stock Status</th>
                <th className="px-8 py-4 text-right">Sale Price</th>
                <th className="px-8 py-4 text-right">Purchase Price</th>
                <th className="px-8 py-4 text-right">Current Stock</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {ITEMS.map((item, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id} 
                  className="hover:bg-surface-container-lowest transition-colors group cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center text-primary font-bold text-[10px]">
                        {item.unit.toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-on-surface">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      item.status === 'OK' ? "bg-green-50 text-green-700" : 
                      item.status === 'LOW STOCK' ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-on-surface">{formatCurrency(item.salePrice)}</td>
                  <td className="px-8 py-5 text-right font-medium text-outline">{formatCurrency(item.purchasePrice)}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "font-black text-lg",
                        item.stock <= (item.minAlert || 0) ? "text-red-600" : "text-primary"
                      )}>
                        {item.stock} {item.unit}
                      </span>
                      {item.minAlert && (
                        <span className="text-[9px] font-bold text-outline uppercase tracking-widest">
                          Min Alert: {item.minAlert}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-surface-container rounded-lg text-outline hover:text-primary transition-all">
                        <History className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-surface-container rounded-lg text-outline hover:text-primary transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
