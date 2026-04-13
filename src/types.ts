export type Screen = 
  | 'login' 
  | 'dashboard' 
  | 'parties' 
  | 'party-details' 
  | 'transactions' 
  | 'new-invoice' 
  | 'invoice-view' 
  | 'items' 
  | 'reports' 
  | 'expenses' 
  | 'settings';

export interface Party {
  id: string;
  name: string;
  initials: string;
  phone: string;
  balance: number;
  type: 'Retailer' | 'Wholesaler' | 'Customer' | 'Key Party' | 'Returns';
  balanceType: 'get' | 'give';
  lastActive: string;
}

export interface Transaction {
  id: string;
  invoiceNo: string;
  partyName: string;
  partyInitials: string;
  type: 'SALE' | 'PURCHASE' | 'PAYMENT-IN' | 'PAYMENT-OUT' | 'EXPENSE';
  date: string;
  amount: number;
  balance: number;
}

export interface Item {
  id: string;
  name: string;
  unit: string;
  salePrice: number;
  purchasePrice: number;
  stock: number;
  minAlert: number | null;
  status: 'OK' | 'LOW STOCK' | 'OUT OF STOCK';
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: 'Transport' | 'Labour' | 'Rent' | 'Materials' | 'Utilities' | 'Misc';
  amount: number;
}
