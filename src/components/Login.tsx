import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, TrendingUp, Users, Package } from 'lucide-react';
import { motion } from 'motion/react';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('ashifkadri@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden p-20 flex-col justify-between">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-primary font-black text-3xl">T</div>
            <h1 className="text-4xl font-headline font-black text-white tracking-tight">TradeBook</h1>
          </div>
          <div className="space-y-12 max-w-md">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-5xl font-headline font-black text-white leading-[1.1]">Master Your Business <span className="text-secondary-container">Ledger</span></h2>
              <p className="text-teal-100/80 text-lg">The most sophisticated wholesale management platform.</p>
            </motion.div>
            <div className="space-y-6">
              {[
                { icon: TrendingUp, title: "Real-time Analytics", desc: "Track every sale and purchase." },
                { icon: Users, title: "Party Management", desc: "Keep your receivables in check." },
                { icon: Package, title: "Smart Inventory", desc: "Never run out of stock." },
              ].map((feature, i) => (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * (i + 1) }} key={feature.title} className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-secondary-container" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                    <p className="text-teal-100/60 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3 text-teal-100/40 text-sm font-medium">
          <Shield className="w-4 h-4" /> Enterprise Grade Security
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-4xl font-headline font-black text-on-surface mb-3">Welcome Back</h2>
            <p className="text-outline font-medium">Please enter your details to access your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-surface-container-high rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-surface-container-high rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              Sign In to TradeBook <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
