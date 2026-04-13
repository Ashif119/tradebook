import { Party, Transaction, Item, Expense } from './types';

export const PARTIES: Party[] = [
  { id: '1', name: 'Ashok LRP', initials: 'AL', phone: '9335372007', balance: 230518, type: 'Retailer', balanceType: 'get', lastActive: '04 Apr' },
  { id: '2', name: 'Imran Majhgai', initials: 'IM', phone: '---', balance: 29973, type: 'Customer', balanceType: 'get', lastActive: '01 Apr' },
  { id: '3', name: 'Chaman Nakha', initials: 'CN', phone: '---', balance: 306973, type: 'Wholesaler', balanceType: 'get', lastActive: '28 Mar' },
  { id: '4', name: 'Saleem Ramapur', initials: 'SR', phone: '---', balance: 1731119, type: 'Key Party', balanceType: 'get', lastActive: '15 Mar' },
  { id: '5', name: 'Customer Vapsi', initials: 'CV', phone: '---', balance: 457096, type: 'Returns', balanceType: 'give', lastActive: '12 Mar' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: '1', invoiceNo: '#TB2600072', partyName: 'Amit Kumar & Sons', partyInitials: 'AK', type: 'SALE', date: '22 Oct, 11:20 AM', amount: 125000, balance: 540000 },
  { id: '2', invoiceNo: '#TB2600071', partyName: 'Priya Textiles', partyInitials: 'PT', type: 'PAYMENT-IN', date: '22 Oct, 09:45 AM', amount: 85000, balance: 12400 },
  { id: '3', invoiceNo: '#TB2600070', partyName: 'Rahul Sharma Agency', partyInitials: 'RS', type: 'SALE', date: '21 Oct, 06:15 PM', amount: 245900, balance: 1280000 },
];

export const ITEMS: Item[] = [
  { id: '1', name: '1103 vs 4x7 (84p)', unit: 'pcs', salePrice: 105, purchasePrice: 0, stock: 20, minAlert: 5, status: 'OK' },
  { id: '2', name: '25 star 6x9 (96p)', unit: 'pcs', salePrice: 110, purchasePrice: 110, stock: 176, minAlert: null, status: 'OK' },
  { id: '3', name: 'Woven bag 50kg', unit: 'bag', salePrice: 45, purchasePrice: 38, stock: 2, minAlert: 5, status: 'LOW STOCK' },
];

export const EXPENSES: Expense[] = [
  { id: '1', date: '12 Apr 2024', description: 'Diesel for Goods Truck', category: 'Transport', amount: 2500 },
  { id: '2', date: '10 Apr 2024', description: 'Weekly Wage - 4 Workers', category: 'Labour', amount: 8000 },
  { id: '3', date: '05 Apr 2024', description: 'Warehouse A Rental', category: 'Rent', amount: 15000 },
  { id: '4', date: '02 Apr 2024', description: 'Office Supplies & Snacks', category: 'Misc', amount: 500 },
];
