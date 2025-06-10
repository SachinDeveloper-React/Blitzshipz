import {create} from 'zustand';
import {OrderItem} from '../types';

type PaginationState = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type OrderStore = {
  orders: OrderItem[];
  isLoading: boolean;
  pagination: PaginationState;
  loadOrders: (initialData: OrderItem[]) => void;
  appendOrders: (newData: OrderItem[]) => void;
  updateOrder: (updated: OrderItem) => void;
  resetOrders: () => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
};

export const useOrderStore = create<OrderStore>(set => ({
  orders: [],
  pagination: {
    currentPage: 0,
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
  },
  isLoading: false,

  loadOrders: initialData =>
    set({
      orders: initialData,
      isLoading: false,
    }),

  appendOrders: newData =>
    set(state => ({
      orders: [...state.orders, ...newData],
      isLoading: false,
    })),

  updateOrder: updated =>
    set(state => ({
      orders: state.orders.map(o =>
        o.id === updated.id ? {...o, ...updated} : o,
      ),
    })),

  resetOrders: () =>
    set({
      orders: [],
      isLoading: false,
    }),
  setPagination: pagination =>
    set(state => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    })),
}));
