import React, { useState } from 'react';
import { Screen } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Parties, PartyDetails } from './components/Parties';
import { Transactions } from './components/Transactions';
import { Inventory } from './components/Items';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSelectedPartyId(null);
  };

  const handleSelectParty = (id: string) => {
    setSelectedPartyId(id);
    setCurrentScreen('party-details');
  };

  if (currentScreen === 'login') {
    return <Login onLogin={() => setCurrentScreen('dashboard')} />;
  }

  const getTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'Dashboard Overview';
      case 'parties': return 'Manage Parties';
      case 'party-details': return 'Party Details';
      case 'transactions': return 'Transaction History';
      case 'items': return 'Inventory Management';
      case 'reports': return 'Business Reports';
      case 'expenses': return 'Expense Tracker';
      case 'settings': return 'Business Settings';
      default: return 'TradeBook';
    }
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      onNavigate={handleNavigate} 
      title={getTitle()}
    >
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'parties' && <Parties onSelectParty={handleSelectParty} />}
      {currentScreen === 'party-details' && selectedPartyId && (
        <PartyDetails partyId={selectedPartyId} onBack={() => handleNavigate('parties')} />
      )}
      {currentScreen === 'transactions' && <Transactions />}
      {currentScreen === 'items' && <Inventory />}
      {/* Placeholder for other screens */}
      {['reports', 'expenses', 'settings'].includes(currentScreen) && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-outline">
          <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center mb-4">
            <span className="text-4xl">🏗️</span>
          </div>
          <h3 className="text-2xl font-headline font-bold text-on-surface">Under Construction</h3>
          <p className="mt-2 font-medium">This module is being polished for the best experience.</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
