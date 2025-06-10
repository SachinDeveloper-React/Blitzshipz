import {create} from 'zustand';

export type TransactionType = 'DEDUCTION' | 'REFUND' | 'RECHARGE' | 'ADDITION';

export type Transaction = {
  id: string;
  transactionId: string;
  accountId: string;
  userId: string;
  userRef: string;
  transactionType: TransactionType;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  createDate: string;
  balance: number;
  description: string;
  delayDescription?: string | null;
  amount: number;
  weightCharge: number;
  orderId?: string;
  waybillNumber?: string;
};

type BalanceStore = {
  balance: number;
  updateBalance: (newBalance: number) => void;
};

export const useFundStore = create<BalanceStore>(set => ({
  balance: 0,
  updateBalance: newBalance => set({balance: newBalance}),
}));

type PaginationState = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type TransactionState = {
  transactions: Transaction[];
  recharges: Transaction[];
  refundes: Transaction[];
  deductions: Transaction[];
  pagination: PaginationState;
  addTransaction: (list: Transaction[], pagination: PaginationState) => void;
  setTransactions: (list: Transaction[], pagination: PaginationState) => void;

  addRecharges: (list: Transaction[], pagination: PaginationState) => void;
  setRecharges: (list: Transaction[], pagination: PaginationState) => void;

  addRefundes: (list: Transaction[], pagination: PaginationState) => void;
  setRefundes: (list: Transaction[], pagination: PaginationState) => void;

  addDeductions: (list: Transaction[], pagination: PaginationState) => void;
  setDeductions: (list: Transaction[], pagination: PaginationState) => void;
  clearTransactions: () => void;
  clearRecharges: () => void;
  clearRefundes: () => void;
  clearDeductions: () => void;
};

export const useTransactionStore = create<TransactionState>(set => ({
  transactions: [],
  recharges: [],
  refundes: [],
  deductions: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  },

  addTransaction: (list, pagination) =>
    set(state => ({
      transactions: [...state.transactions, ...list],
      pagination,
    })),
  setTransactions: (list, pagination) =>
    set({transactions: list, pagination: pagination}),

  addRecharges: (list, pagination) =>
    set(state => ({
      recharges: [...state.recharges, ...list],
      pagination,
    })),
  setRecharges: (list, pagination) =>
    set({recharges: list, pagination: pagination}),

  addRefundes: (list, pagination) =>
    set(state => ({
      refundes: [...state.refundes, ...list],
      pagination,
    })),
  setRefundes: (list, pagination) =>
    set({refundes: list, pagination: pagination}),
  addDeductions: (list, pagination) =>
    set(state => ({
      deductions: [...state.deductions, ...list],
      pagination,
    })),
  setDeductions: (list, pagination) =>
    set({deductions: list, pagination: pagination}),

  clearTransactions: () => set({transactions: []}),
  clearRecharges: () => set({recharges: []}),
  clearRefundes: () => set({refundes: []}),
  clearDeductions: () => set({deductions: []}),
}));
