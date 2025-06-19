import {create} from 'zustand';

type Ticket = {
  id: string;
  ticketNumber: string;
  awbNumber: string;
  userId: string;
  userRef: string;
  createdDate: string;
  modifyDate: string | null;
  closedDate: string | null;
  status: string;
  description: string;
  category: string;
  orderId: string | null;
  subCategory: string;
  readBySupport: boolean;
};

type TicketState = {
  tickets: Ticket[];
  totalPages: number;
  totalElements: number;
  currentPages: number;
  loading: boolean;
  refreshLoading: boolean;
  loadMoreLoading: boolean;
  error: string | null;

  setTickets: (data: Ticket[]) => void;
  appendTickets: (data: Ticket[]) => void;
  setLoading: (loading: boolean) => void;
  setRefreshLoading: (refreshLoading: boolean) => void;
  setLoadMoreLoading: (loadMoreLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPaginationInfo: (totalPages: number, totalElements: number) => void;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
};

export const useTicketStore = create<TicketState>(set => ({
  tickets: [],
  totalPages: 0,
  totalElements: 0,
  currentPages: 0,
  loading: false,
  refreshLoading: false,
  loadMoreLoading: false,
  error: null,

  setTickets: data => set({tickets: data}),
  appendTickets: data => set(state => ({tickets: [...state.tickets, ...data]})),
  setLoading: loading => set({loading}),
  setRefreshLoading: refreshLoading => set({refreshLoading}),
  setLoadMoreLoading: loadMoreLoading => set({loadMoreLoading}),
  setError: error => set({error}),

  setPaginationInfo: (totalPages, totalElements) =>
    set({totalPages, totalElements}),
  setCurrentPage: currentPages => set({currentPages}),
  resetPage: () => set({currentPages: 0}),
}));
