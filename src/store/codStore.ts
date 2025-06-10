import {create} from 'zustand';
type codSummaryState = {
  codPaidToday: number;
  lastCodRemitted: number;
  totalCodRemitted: number;
};

type PaginationState = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type CodRemittance = {
  id: string;
  userId: string;
  userRef: string;
  vendorCode: string;
  orderId: string;
  orderRef: string;
  deliveredDate: string;
  amount: number;
  remittanceDate: string;
  status: string;
  createDate: string;
  modifyDate: string;
};

type Remittance = {
  id: string;
  amountPayable: number;
  status: string;
  transactionId: string | null;
  createDate: string;
  modifyDate: string;
  userId: string;
  vendorCode: string;
  userRef: string;
  codRemittances: CodRemittance[];
  remittanceNumber: string;
  dueDate: string;
};

type codState = {
  summary: codSummaryState | null;
  remittances: Remittance[];
  pagination: PaginationState;
  setSummary: (data: codSummaryState) => void;
  setRemittances: (data: Remittance[]) => void;
  appendRemittances: (data: Remittance[]) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
};

export const useCodStore = create<codState>(set => ({
  summary: null,
  remittances: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  },
  setSummary: data => set({summary: data}),
  setRemittances: data => set({remittances: data}),
  appendRemittances: data =>
    set(state => ({
      remittances: [...state.remittances, ...data],
    })),
  setPagination: pagination =>
    set(state => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    })),
}));
