import {create} from 'zustand';

export type DiscrepancyItem = {
  id: string;
  orderId: string;
  orderRef: string;
  waybill: string;
  userId: string;
  oldAmount: number;
  weight: number;
  newWeight: number;
  newAmount: number;
  createDate: string;
  discrepancyStatus: string | null;
  deduction: boolean;
};

export type DiscrepancyPagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type DiscrepancyStore = {
  discrepancies: DiscrepancyItem[];
  pagination: DiscrepancyPagination;
  loading: boolean;
  refreshLoading: boolean;
  loadMoreLoading: boolean;
  error: string | null;
  setDiscrepancies: (
    items: DiscrepancyItem[],
    pagination: DiscrepancyPagination,
  ) => void;
  appendDiscrepancies: (
    items: DiscrepancyItem[],
    pagination: DiscrepancyPagination,
  ) => void;
  setLoading: (loading: boolean) => void;
  setRefreshLoading: (loading: boolean) => void;
  setLoadMoreLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useDiscrepancyStore = create<DiscrepancyStore>(set => ({
  discrepancies: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  },
  loading: false,
  refreshLoading: false,
  loadMoreLoading: false,
  error: null,

  setDiscrepancies: (items, pagination) =>
    set({discrepancies: items, pagination}),

  appendDiscrepancies: (items, pagination) =>
    set(state => ({
      discrepancies: [...state.discrepancies, ...items],
      pagination,
    })),

  setLoading: loading => set({loading}),
  setRefreshLoading: loading => set({refreshLoading: loading}),
  setLoadMoreLoading: loading => set({loadMoreLoading: loading}),
  setError: error => set({error}),
}));
