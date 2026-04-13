import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ArrowLeftRight, 
  Package, 
  BarChart3, 
  Wallet, 
  Settings, 
  LogOut,
  Search,
  Bell,
  Menu,
  ChevronRight
} from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'parties', icon: Users, label: 'Parties' },
    { id: 'transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { id: 'items', icon: Package, label: 'Items' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'expenses', icon: Wallet, label: 'Expenses' },
  ];

  return (
    <div className="w-64 h-screen glass-sidebar flex flex-col text-white fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center text-primary font-bold text-xl">
          T
        </div>
        <div>
          <h1 className="font-headline font-bold text-lg leading-tight">TradeBook</h1>
          <p className="text-[10px] text-teal-200 uppercase tracking-widest">Wholesale Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              currentScreen === item.id 
                ? "bg-white/10 text-white shadow-lg" 
                : "text-teal-100/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-200",
              currentScreen === item.id ? "scale-110" : "group-hover:scale-110"
            )} />
            <span className="font-medium">{item.label}</span>
            {currentScreen === item.id && (
              <ChevronRight className="w-4 h-4 ml-auto text-secondary-container" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button 
          onClick={() => onNavigate('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
            currentScreen === 'settings' ? "bg-white/10 text-white" : "text-teal-100/60 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={() => onNavigate('login')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-teal-100/60 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

interface TopbarProps {
  title: string;
}

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-surface-container-high px-8 flex items-center justify-between sticky top-0 z-40 ml-64">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-surface-container rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-headline font-bold text-on-surface">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search transactions, parties..." 
            className="pl-10 pr-4 py-2.5 bg-surface-container-low border-none rounded-xl w-80 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 hover:bg-surface-container rounded-xl relative transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-10 w-[1px] bg-surface-container-high mx-1"></div>
          
          <button className="flex items-center gap-3 p-1.5 hover:bg-surface-container rounded-xl transition-colors">
            <div className="w-9 h-9 bg-primary-container rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AK
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold leading-none">Ashif Kadri</p>
              <p className="text-[10px] text-outline font-medium uppercase mt-1">Admin</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate, title }) => {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar currentScreen={currentScreen} onNavigate={onNavigate} />
      <div className="flex flex-col">
        <Topbar title={title} />
        <main className="ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
