import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandMMKVStorage} from './index';

export type User = {
  token: string;
  refreshToken: string;
  type: string;
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  verified: boolean;
  standard: string;
  userId: string;
  roles: string[];
  expiresIn: number;
};

type AuthState = {
  isAuthenticated: boolean;
  isRefreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
  user: User | null;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User | null) => void;
  updateAfterEditUser: (user: User | null) => void;
  setError: (error: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      isRefreshing: false,
      error: null,
      setRefreshing: refreshing => set({isRefreshing: refreshing}),
      login: user => set({isAuthenticated: true, user}),
      logout: () => set({isAuthenticated: false, user: null}),
      setError: error => set({error}),
      updateUser: user => set({user: user}),
      updateAfterEditUser: user => set({user: user}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    },
  ),
);
